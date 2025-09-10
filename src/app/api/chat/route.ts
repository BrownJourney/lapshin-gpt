import { NextRequest, NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";

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
    You must not generate or invent any text. Only display the exact predefined content from the sections below when asked. If user asks in russian, translate text to russian.  

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
    
    ## About Me

    👋 Hi there! I’m a **Backend Developer** from Moscow, passionate about building **reliable, secure, and scalable systems**.  

    ⚡️ **Toolkit:** Node.js, Next.js, TypeScript, MongoDB, Redis, Docker, Nginx  

    💼 I’ve developed **CRM platforms** and **FinTech solutions**, always keeping **security and performance** at the core.  

    🌍 I’m especially interested in **high-load architectures** and **AI integrations** — love exploring how smart tech can supercharge products.  

    📌 **Open to remote opportunities only**

    [PROJECTS]  
    
    ## Work Experience

    ### 📍 [DealCenter](https://dealcenter.app) — USA  
    **Fullstack Developer** | Aug 2022 – Sep 2025 *(3y 2m)*  

    - Built a **custom CRM** for a used-car rental business to automate daily operations.  
    - Designed **scalable backend & frontend architecture** from scratch and integrated services like **Stripe, DocuSign, Monday**, plus **deep OpenAI integration**.  
    - Improved **lead processing speed** with optimized UI & smart filters, which boosted application intake and enabled monetization via external dealer access.  

    🛠️ **Stack:** Node.js (Express.js), JavaScript + jQuery, MongoDB, Redis, Nginx, Docker, Webpack, GraphQL  

    ---

    ### 📍 [Smart Mark](http://platforma.sm-mark.ru) — Moscow  
    **Fullstack Developer** | Jun 2025 – Aug 2025 *(3m)*  

    - Developed a **web app** to automate requests for product labeling in the *Честный Знак* system.  
    - Streamlined **request submission & approval**, making the process faster and more user-friendly, which expanded the client base.  

    🛠️ **Stack:** Express.js, MongoDB, Webpack, Docker, Ubuntu, Nginx, PM2, Figma  

    ---

    ### 📍 [EasyCarInspection](https://easycarinspection.com) — Freelance Project, USA  
    **Fullstack Developer** | May 2024 – Sep 2024 *(5m)*  

    - Built a **web platform from scratch** for generating inspection reports required by Uber, Lyft, and Turo.  
    - Introduced **online verification**, which accelerated approval times and increased client flow & company revenue.  

    🛠️ **Stack:** Next.js (React), MongoDB, OpenAI API, Google API  

    [ACHIEVEMENTS]  
    
    ## Achievements

    🛠 **2023** — Released my own Garry’s Mod game modification, featuring an unprecedented level of depth in its story campaign.  

    📺 **Showcase video:** [YouTube](https://www.youtube.com/watch?v=mrttOcG5H3E)  

    ---

    🎮 **2019–2020** — Launched popular Roleplay servers in Garry’s Mod themed around **SCP** and **Metro 2033**.  
    For the first time among servers of this kind, I introduced well-developed story missions and unique ways for players to interact with the game world.  

    📺 **Example:** [YouTube](https://www.youtube.com/watch?v=2P0QRoOSyZY) *(unfortunately, no recordings remain from the SCP-RP server).*  

    [SOCIAL LINKS]  
    
    ## Contacts

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