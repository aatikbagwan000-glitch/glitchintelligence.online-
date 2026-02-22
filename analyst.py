import pandas as pd

# 1. Load your inventory data
try:
    df = pd.read_csv('inventory_data.csv')
    print("--- Glitch Intelligence System Scan ---")

    # 2. Find Logic Glitch: Negative Stock
    negative_stock = df[df['Stock_Level'] < 0]
    for index, row in negative_stock.iterrows():
        print(f"ALERT: Logic Glitch on {row['Product_Name']}! Stock cannot be {row['Stock_Level']}.")

    # 3. Find Data Glitch: Missing Price
    missing_price = df[df['Price_INR'].isna()]
    for index, row in missing_price.iterrows():
        print(f"ALERT: Pricing Glitch on {row['Product_Name']}! Price is missing.")

    # 4. Find Status Glitch: Manual Errors
    status_errors = df[df['Status'] == 'Error']
    for index, row in status_errors.iterrows():
        print(f"ALERT: System Status Error on {row['Product_Name']}. Manual check required.")

except Exception as e:
    print(f"Error reading file: {e}. Check if the file is a clean CSV!")
  
