from google import genai
client = genai.Client(api_key="YOUR_API_KEY_HERE")

def get_glitch_report(csv_data):
    prompt = f"Analyze this inventory data and list the top 3 'glitches' (errors) in a bulleted list: {csv_data}"
    response = client.models.generate_content(model="gemini-1.5-flash", contents=prompt)
    return response.text
