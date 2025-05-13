import re

import pandas as pd
import requests
from tqdm import tqdm  # For progress bar


def parse_location_string(location_str):
    """
    Improved parser that handles spaces inside parentheses
    """
    # Updated regex pattern to handle spaces around the airport code
    match = re.match(r"(.+?)\s+\(\s*([A-Z]{3})\s*\)", location_str)

    if not match:
        return None

    city = match.group(1).strip()
    code = match.group(2).strip()

    # Clean up city name formatting
    city = re.sub(r"\s*-\s*", "-", city)  # Fix hyphen spacing
    city = re.sub(r"\s{2,}", " ", city)  # Replace multiple spaces with single

    return {"cityName": city, "airportCode": code, "airportName": f"{city} Airport"}


def post_to_backend(data, api_url):
    """Posts data to backend API with error handling"""
    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(api_url, json=data, headers=headers, timeout=10)

        if response.status_code == 201:
            return True, None
        else:
            return False, f"Error {response.status_code}: {response.text}"

    except requests.exceptions.RequestException as e:
        return False, f"Connection error: {str(e)}"


def main():
    # Configuration - Modify these values
    EXCEL_PATH = "./airport_code_list.xlsx"  # Path to your Excel file
    # API_URL = "http://localhost:5000/flightLocation"
    API_URL = "https://server.munemiglobal.com/flightlocation"
    SHEET_NAME = "Table 1"  # Name of Excel sheet containing data

    # Read Excel file
    try:
        df = pd.read_excel(
            EXCEL_PATH, sheet_name=SHEET_NAME, header=None, names=["raw_data"]
        )
    except FileNotFoundError:
        print(f"Error: File not found at {EXCEL_PATH}")
        return

    print(f"Found {len(df)} entries in Excel file")

    successful = 0
    errors = []

    # Process entries with progress bar
    for index, row in tqdm(df.iterrows(), total=len(df)):
        parsed = parse_location_string(row["raw_data"])

        if not parsed:
            errors.append(f"Row {index+1}: Invalid format - {row['raw_data']}")
            continue

        # Post to API
        success, error = post_to_backend(parsed, API_URL)

        if success:
            successful += 1
        else:
            errors.append(f"Row {index+1}: {error} - {row['raw_data']}")

    # Print summary
    print(f"\nResults:")
    print(f"Successfully posted: {successful}/{len(df)}")
    print(f"Errors: {len(errors)}")

    if errors:
        print("\nError details:")
        for error in errors:
            print(f"• {error}")


if __name__ == "__main__":
    main()
