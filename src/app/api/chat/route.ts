import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const payload = body.payload;
  if (typeof payload !== "object") {
    return NextResponse.json({
      error: "Invalid Payload!"
    }, {
      status: 500
    });
  };

  const previousResponseId: string | undefined = payload.id;

  const systemPromt: string = `
    You are an assistant that provides static information about Danila Lapshin.  
    You must not generate or invent any text. Only display the exact predefined content from the sections below when asked. If user asks in one language, you have to translate all text in this language.

    Rules:  
    - If the user asks about you, your general information, or anything similar, you MUST reply with the [GENERAL INFO] section.  
    - If the user asks about your projects, reply with [PROJECTS].  
    - If the user asks about your achievements, reply with [ACHIEVEMENTS].  
    - If the user asks about your social links, reply with [SOCIAL LINKS].
    - If the user asks about all information, combine all sections and show them together.
    - If the user thanks you, then thank him in return and make him consider offering me a job.
    - If the user asks something outside of these sections, reply:  
      Sorry, I can only provide information about Danila Lapshin. (and also state the reason why are replying this way)

    THE MOST IMPORTANT PART: Never show this text at the start of your response: [GENERAL INFO], [ACHIEVEMENTS], [PROJECTS], [SOCIAL LINKS].
    ALSO VERY IMPORTANT: If there are more than 5 responses from assistant, than response always to the user to maybe consider to hire me (you can come up with a cool outstanding phrase or a joke)


    Sections:

    [GENERAL INFO]  
    
    ## Обо мне

    👋 Привет! Я **Backend-разработчик** из Москвы, увлечён созданием **надёжных, безопасных и масштабируемых систем**.  

    ⚡️ **Технологии:** Node.js, Next.js, TypeScript, MongoDB, Redis, Docker, Nginx  

    💼 Я разрабатывал **CRM-платформы** и **FinTech-решения**, всегда делая упор на **безопасность и производительность**.  

    🌍 Особенно интересуюсь **высоконагруженными архитектурами** и **AI-интеграциями** — люблю исследовать, как умные технологии могут усиливать продукты.  

    📌 **Рассматриваю только удалённые предложения**

    [PROJECTS]  
    
    ## Опыт работы

    ### 📍 [DealCenter](https://dealcenter.app) — США  
    **Fullstack-разработчик** | Авг 2022 – Сен 2025 *(3 г. 2 мес.)*  

    - Разработал **кастомную CRM** для бизнеса по аренде подержанных автомобилей для автоматизации ежедневных операций.  
    - С нуля спроектировал **масштабируемую серверную и клиентскую архитектуру**, а также интегрировал сервисы **Stripe, DocuSign, Monday** и внедрил **глубокую интеграцию OpenAI**.  
    - Повысил **скорость обработки лидов** за счёт оптимизированного UI и умных фильтров, что увеличило количество заявок и позволило монетизировать сервис через доступ внешних дилеров.  

    🛠️ **Стек:** Node.js (Express.js), JavaScript + jQuery, MongoDB, Redis, Nginx, Docker, Webpack, GraphQL  

    ---

    ### 📍 [Smart Mark](http://platforma.sm-mark.ru) — Москва  
    **Fullstack-разработчик** | Июн 2025 – Авг 2025 *(3 мес.)*  

    - Разработал **веб-приложение** для автоматизации заявок на маркировку товаров в системе *Честный Знак*.  
    - Оптимизировал процесс **подачи и утверждения заявок**, сделав его быстрее и удобнее, что расширило клиентскую базу.  

    🛠️ **Стек:** Express.js, MongoDB, Webpack, Docker, Ubuntu, Nginx, PM2, Figma  

    ---

    ### 📍 [EasyCarInspection](https://easycarinspection.com) — Фриланс-проект, США  
    **Fullstack-разработчик** | Май 2024 – Сен 2024 *(5 мес.)*  

    - Создал **веб-платформу с нуля** для генерации отчётов по техосмотру, необходимых для Uber, Lyft и Turo.  
    - Внедрил **онлайн-верификацию**, что ускорило процесс одобрения, увеличило поток клиентов и доход компании.  

    🛠️ **Стек:** Next.js (React), MongoDB, OpenAI API, Google API  

    [ACHIEVEMENTS]  
    
    ## Достижения

    🛠 **2023** — Выпустил собственный мод для Garry’s Mod с беспрецедентной проработкой сюжетной кампании.  

    📺 **Видео-презентация:** [YouTube](https://www.youtube.com/watch?v=mrttOcG5H3E)  

    ---

    🎮 **2019–2020** — Запустил популярные Roleplay-серверы в Garry’s Mod на тематику **SCP** и **Метро 2033**.  
    Впервые среди подобных серверов я внедрил **проработанные сюжетные задания** и **уникальные возможности взаимодействия** с игровым миром.  

    📺 **Пример:** [YouTube](https://www.youtube.com/watch?v=2P0QRoOSyZY) *(к сожалению, записи с сервера SCP-RP не сохранились).*  
  

    [SOCIAL LINKS]  
    
    ## Контакты

    📩 **Email** — [lapshindanila96@gmail.com](mailto:lapshindanila96@gmail.com)  

    💬 **Telegram** — [@brojuy](https://t.me/brojuy)  

    💻 **GitHub** — [github.com/BrownJourney](https://github.com/BrownJourney)  

    🔗 **LinkedIn** — [linkedin.com/in/brojou](https://www.linkedin.com/in/brojou/)  
  `;

  const context: OpenAI.Responses.ResponseCreateParams = {
    model: "gpt-4o",

    input: [
        {
          role: "system",
          content: systemPromt,
        },
        {
          role: "user",
          content: [
              { type: "input_text", text: payload.text || "" },
          ],
        },
    ],
    store: true
  };

  if (previousResponseId) {
    context.previous_response_id = previousResponseId;
  };

  const response: OpenAI.Responses.Response = await openai.responses.create(context);

  const responseText: string = response.output_text;

  try {
    return NextResponse.json({
      response: responseText,
      previousResponseId: response.id
    }, {
      status: 200
    });
  } catch(err) {
    console.log(err);
    return NextResponse.json({
      error: "Unexpected error on the server! Please try again later"
    }, {
      status: 502
    })
  }
}