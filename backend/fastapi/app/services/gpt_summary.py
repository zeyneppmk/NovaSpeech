from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def summarize_text(text: str) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that creates abstract summaries of Turkish meeting transcripts. Do not repeat the sentences, instead write a concise summary that conveys the main idea."},
                {"role": "user", "content": f"Lütfen aşağıdaki konuşmayı analiz ederek konunun ana fikrini, önemli noktalarını ve konuşmanın özetini çıkar. Detaylara girmeden öz bir şekilde yaz:\n\n{text}"}
            ],
            temperature=0.3
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Özetleme sırasında hata oluştu: {str(e)}"