const { GoogleGenAI, Type } = require("@google/genai")

const puppeteer=require("puppeteer")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {

        matchScore: {
            type: Type.NUMBER,
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job describe"
        },

        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The technical question can be asked in the interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description: "The intention of interviewer behind asking this question"
                    },
                    answer: {
                        type: Type.STRING,
                        description: "How to answer this question, what points to cover, what approach to take etc."
                    }
                },
                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },


        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The behavioral question can be asked in the interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description: "The intention of interviewer behind asking this question"
                    },
                    answer: {
                        type: Type.STRING,
                        description: "How to answer this question, what points to cover, what approach to take etc."
                    }
                },
                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },


        skillGaps: {
            type: Type.ARRAY,
            description: "List of skill gaps in the candidate's profile along with their severity",
            items: {
                type: Type.OBJECT,
                properties: {

                    skill: {
                        type: Type.STRING,
                        description: "The skill which the candidate is lacking"
                    },

                    severity: {
                        type: Type.STRING,
                        enum: [
                            "low",
                            "medium",
                            "high"
                        ],
                        description: "The severity of this skill gap"
                    }

                },
                required: [
                    "skill",
                    "severity"
                ]
            }
        },


        preparationPlans: {
            type: Type.ARRAY,
            description: "A day-wise preparation plans for the candidate",
            minItems: 10,
            items: {

                type: Type.OBJECT,

                properties: {

                    day: {
                        type: Type.NUMBER,
                        description: "The day number starting from 1"
                    },

                    focus: {
                        type: Type.STRING,
                        description: "Main focus of this day"
                    },

                    tasks: {
                        type: Type.ARRAY,
                        description: "Tasks to complete",
                        items: {
                            type: Type.STRING
                        }
                    }

                },

                required: [
                    "day",
                    "focus",
                    "tasks"
                ]

            }
        },


        title: {
            type: Type.STRING,
            description: "The title of the job for which interview report is generated"
        }

    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlans",
        "title"
    ]
}




async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `
Generate a complete interview report.

IMPORTANT:
You must include:
- matchScore
- technicalQuestions
- behavioralQuestions
- skillGaps
- preparationPlans
- title




Never skip any field.

Candidate details:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`


    const response = await ai.models.generateContent({

        model: "gemini-3.5-flash",

        contents: prompt,

        config: {

            responseMimeType: "application/json",

            responseSchema: interviewReportSchema

        }

    })


    const data = response.text

    //console.log(data)


    return JSON.parse(data)

}

async function generatePdfFromHtml(htmlContent) {

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    })

    try {

        const page = await browser.newPage()

        const styledHtml = `
<html>
<head>
<style>

    body {
        font-family: Arial, sans-serif;
        font-size: 11.5px;
        line-height: 1.35;
        color: #222;
        margin: 0;
    }

    h1 {
        font-size: 22px;
        margin: 0 0 6px 0;
    }

    h2 {
        font-size: 15px;
        margin: 10px 0 5px 0;
        border-bottom: 1px solid #ccc;
    }

    h3 {
        font-size: 13px;
        margin: 6px 0 3px 0;
    }

    p {
        margin: 3px 0;
    }

    ul {
        margin: 4px 0;
        padding-left: 18px;
    }

    li {
        margin-bottom: 2px;
    }

    * {
        box-sizing: border-box;
    }

</style>
</head>

<body>
${htmlContent}
</body>
</html>
`

        await page.setContent(styledHtml, {
            waitUntil: "networkidle0"
        })

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "10mm",
                bottom: "10mm",
                left: "10mm",
                right: "10mm"
            }
        })

        return pdfBuffer

    } finally {
        await browser.close()
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

   const resumePdfSchema = {
    type: Type.OBJECT,
    properties: {
        html: {
            type: Type.STRING,
            description: "The HTML content of the resume which can be converted to PDF using puppeteer"
        }
    },
    required: ["html"]
}

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1 pages long when converted to PDF. Focus on quality and quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.The ATS should cross 80
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: resumePdfSchema
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}


module.exports = {
    generateInterviewReport,generateResumePdf
}