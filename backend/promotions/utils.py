import re
from datetime import datetime, timedelta

def classify_deal_type(deal_text): #ok
    #BOGO: buy X ... get X ... | X-for-X
    if re.search(r'(?i)\b(?:buy\s+\d+[,\s]*(?:and|&)?\s*(?:get|free)\s+\d+|\d+[-\s]for[-\s]\d+)\b', deal_text):
        return "BOGO"
    
    #Bundle: ... for $X~.XX
    if re.search(r'(?i)\b.+?\s+for\s+\$\d+(?:\.\d{2})?\b', deal_text):
        return "Bundle"
    
    #Discount: $X off, X% off, $X item ~~ discount search only after bundle to avoid price conflict
    if re.search(r'(?i)(\$\d+(?:\.\d{2})?\s+\w+|\d+% off|\$\d+(?:\.\d{2})? off)', deal_text):
        return "Discount"
    
    #Freebie: Free ... ~~ free after bogo to avoid conflict
    if re.search(r'(?i)\bfree\b.*\b\w+\b', deal_text):
        return "Freebie"
    
    return "Others"  #default if no match

def parse_dates(date_str):  #updated version, needs work
    today = datetime.today().date()
    dates = []
    
    #case: Till DD month
    
    if match1 := re.search(r"Till (\d{1,2}) (\b\w{3}\b)", date_str, re.IGNORECASE):
        day = int(match1.group(1))
        month_abbr = match1.group(2).title() #3 letter abbre, turn into int in tilldate
        till_date = datetime.strptime(f"{day} {month_abbr}", "%d %b").date()

        #rollover year
        if (till_date.month, till_date.day) < (today.month, today.day):
            till_date = till_date.replace(year=today.year + 1)
        else:
            till_date = till_date.replace(year=today.year)

        #loop to add all dates
        current = today
        while current <= till_date:
            dates.append(current.isoformat())
            current += timedelta(days=1)

        return sorted(dates)

    #case: DD-DD month range dates
    if match2 := re.search(r"(\d{1,2})-(\d{1,2}) (\b\w{3}\b)", date_str, re.IGNORECASE):
        start_day = int(match2.group(1))
        end_day = int(match2.group(2))
        month_abbr = match2.group(3).title()

        start_date = datetime.strptime(f"{start_day} {month_abbr} {today.year}", "%d %b %Y").date()
        end_date = datetime.strptime(f"{end_day} {month_abbr} {today.year}", "%d %b %Y").date()

        #rollover
        if end_date < today:
            start_date = start_date.replace(year=today.year + 1)
            end_date = end_date.replace(year=today.year + 1)

        #loop
        current = start_date
        while current <= end_date:
            dates.append(current.isoformat())
            current += timedelta(days=1)

        return sorted(dates)
    #case: indiv and comma separated dates: 15, 16 May or 15 May. Terminates once comma separated is no longer date
    if match3 := re.search(r"((?:\d{1,2},\s*)*\d{1,2})\s+(\b\w{3}\b)", date_str, re.IGNORECASE):
        day_list = [int(day.strip()) for day in match3.group(1).split(',')]
        month_abbr = match3.group(2).title()

        for day in day_list:
            try:
                date_obj = datetime.strptime(f"{day} {month_abbr} {today.year}", "%d %b %Y").date()

                #rollover
                if date_obj < today:
                    date_obj = datetime.strptime(f"{day} {month_abbr} {today.year + 1}", "%d %b %Y").date()

                dates.append(date_obj.isoformat())
            except ValueError:
                continue  #skip invalids

        return sorted(dates)
    
    return []

def parse_location(location_line): #ok

    #for pinned
    location_match = re.search(r'📍\s*(.*)', location_line)
    at_match = re.search(r'@([\w\s]+)', location_line)
    if location_match:
        return location_match.group(1).strip()
    #for @
    if at_match:
        return at_match.group(1).strip()
    return None

def extract_hyperlink(hypertext): # check
    url_match = re.search(r'https?:\\[^\s]+', hypertext) #need to check if tele returns hyperlinks
    return url_match.group(1) if url_match else None
    

#full parse
def parse_telepromo(text):
    lines = text.strip().split('\n')
    
    restaurant_name = None
    deal_type = None
    active_dates = None #this a list field
    location = None
    more_info_url = None

    if lines[0]: #first line restaurant name
        restaurant_name = re.sub(r'[^\w\s&%.,\'\-]', '', lines[0]).strip() #remove emoji

    regex_datestr = r'\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)'
    regex_timestr = r'\b(0?[1-9]|1[0-2])(:([0-5][0-9]))?(am|pm)\b' #time format

    for line in lines[1:-1]:
        line = line.strip()
        #can't use elif structure as diff fields are sometimes concat with each other

        #date
        if re.search(regex_datestr, line): #just date
            active_dates = parse_dates(line)

        #deals
        if line.startswith('✅') and not deal_type: 
            deal_type = classify_deal_type(line)

        #location
        if line.startswith('📍') or re.search(r'@ ?(?!\$)\S+', line): # @ location but not @ $price
            location = parse_location(line)

        #hyperlink
        if "more info here" in line: 
            more_info_url = extract_hyperlink(line)


    return {
        'restaurant_name': restaurant_name,
        'deal_type': deal_type,
        'active_dates': active_dates if active_dates else None, 
        'location': location,
        'more_info_url': more_info_url
    }
