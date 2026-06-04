const QUIZ_DATA = {
  vocabulary: [
    {
      id: "v1",
      type: "vocabulary",
      question: "Choose the word that best completes the sentence: The student was very ______ about learning new things and always asked extra questions.",
      options: ["curious", "furious", "serious", "obvious"],
      answer: "curious"
    },
    {
      id: "v2",
      type: "vocabulary",
      question: "What does the word 'frequently' mean?",
      options: ["rarely", "often", "slowly", "quietly"],
      answer: "often"
    },
    {
      id: "v3",
      type: "vocabulary",
      question: "Choose the word that best completes the sentence: The weather forecast said there would be a ______ storm tonight.",
      options: ["intense", "intend", "extent", "content"],
      answer: "intense"
    },
    {
      id: "v4",
      type: "vocabulary",
      question: "What does 'beneficial' mean?",
      options: ["harmful", "expensive", "helpful", "difficult"],
      answer: "helpful"
    },
    {
      id: "v5",
      type: "vocabulary",
      question: "Choose the word that best fits: She had to ______ her presentation three times before the boss approved it.",
      options: ["revise", "divide", "advise", "devise"],
      answer: "revise"
    },
    {
      id: "v6",
      type: "vocabulary",
      question: "What does 'ambiguous' mean?",
      options: ["very clear", "having more than one possible meaning", "extremely long", "completely wrong"],
      answer: "having more than one possible meaning"
    },
    {
      id: "v7",
      type: "vocabulary",
      question: "Choose the best word: The teacher gave a ______ explanation so that even beginners could understand.",
      options: ["vague", "concise", "lengthy", "complex"],
      answer: "concise"
    },
    {
      id: "v8",
      type: "vocabulary",
      question: "What does 'collaborate' mean?",
      options: ["to compete against", "to work together", "to copy someone", "to teach others"],
      answer: "to work together"
    },
    {
      id: "v9",
      type: "vocabulary",
      question: "The scientist made a ______ discovery that changed how we understand the human brain.",
      options: ["groundbreaking", "heartbreaking", "breathtaking", "painstaking"],
      answer: "groundbreaking"
    },
    {
      id: "v10",
      type: "vocabulary",
      question: "What does 'persuade' mean?",
      options: ["to force someone to do something", "to convince someone through reasoning", "to prevent someone from acting", "to remind someone of something"],
      answer: "to convince someone through reasoning"
    },
    {
      id: "v11",
      type: "vocabulary",
      question: "Choose the correct word: The government needs to ______ a new policy to deal with rising unemployment.",
      options: ["implement", "compliment", "supplement", "replicate"],
      answer: "implement"
    },
    {
      id: "v12",
      type: "vocabulary",
      question: "What does 'inevitable' mean?",
      options: ["impossible to avoid", "hard to understand", "easy to do", "difficult to explain"],
      answer: "impossible to avoid"
    },
    {
      id: "v13",
      type: "vocabulary",
      question: "The new employee showed great ______ when she solved a problem no one else could figure out.",
      options: ["initiative", "imitative", "insistence", "influence"],
      answer: "initiative"
    },
    {
      id: "v14",
      type: "vocabulary",
      question: "What does 'comprehend' mean?",
      options: ["to explain clearly", "to understand something", "to remember details", "to write about something"],
      answer: "to understand something"
    },
    {
      id: "v15",
      type: "vocabulary",
      question: "Choose the best word: Parents should ______ their children to read books from an early age.",
      options: ["encourage", "discourage", "acknowledge", "recognize"],
      answer: "encourage"
    }
  ],

  grammar: [
    {
      id: "g1",
      type: "grammar",
      question: "Which sentence is grammatically correct?",
      options: [
        "She don't like eating vegetables.",
        "She doesn't like eating vegetables.",
        "She not like eating vegetables.",
        "She isn't like eating vegetables."
      ],
      answer: "She doesn't like eating vegetables."
    },
    {
      id: "g2",
      type: "grammar",
      question: "Choose the correct form: By the time she arrived, the meeting ______.",
      options: ["already finished", "has already finished", "had already finished", "already had finish"],
      answer: "had already finished"
    },
    {
      id: "g3",
      type: "grammar",
      question: "Which sentence uses the passive voice correctly?",
      options: [
        "The students were teach by a new teacher.",
        "The students taught by a new teacher.",
        "The students were taught by a new teacher.",
        "The students are teach by a new teacher."
      ],
      answer: "The students were taught by a new teacher."
    },
    {
      id: "g4",
      type: "grammar",
      question: "Choose the correct word: If I ______ more time, I would travel the world.",
      options: ["have", "had", "will have", "would have"],
      answer: "had"
    },
    {
      id: "g5",
      type: "grammar",
      question: "Identify the error: 'The informations in this report is very useful for our research.'",
      options: [
        "'informations' should be 'information'",
        "'is' should be 'are'",
        "'very' should be 'much'",
        "There is no error"
      ],
      answer: "'informations' should be 'information'"
    },
    {
      id: "g6",
      type: "grammar",
      question: "Which sentence is correct?",
      options: [
        "Neither the students nor the teacher were ready.",
        "Neither the students nor the teacher was ready.",
        "Neither the students nor the teacher are ready.",
        "Neither the students nor the teacher is ready."
      ],
      answer: "Neither the students nor the teacher was ready."
    },
    {
      id: "g7",
      type: "grammar",
      question: "Choose the correct option: She suggested ______ to the conference together.",
      options: ["to go", "going", "go", "gone"],
      answer: "going"
    },
    {
      id: "g8",
      type: "grammar",
      question: "Which sentence correctly uses a relative clause?",
      options: [
        "The book which I borrowed it was very interesting.",
        "The book which I borrowed was very interesting.",
        "The book that I borrowed it was very interesting.",
        "The book I borrowed it was very interesting."
      ],
      answer: "The book which I borrowed was very interesting."
    },
    {
      id: "g9",
      type: "grammar",
      question: "Choose the correct form: She ______ here since 2019.",
      options: ["works", "worked", "has worked", "had worked"],
      answer: "has worked"
    },
    {
      id: "g10",
      type: "grammar",
      question: "Identify the error: 'Despite of the rain, the match continued as planned.'",
      options: [
        "'Despite of' should be 'Despite'",
        "'continued' should be 'was continued'",
        "'the match' should be 'match'",
        "There is no error"
      ],
      answer: "'Despite of' should be 'Despite'"
    }
  ],

  synonyms: [
    {
      id: "s1",
      type: "synonyms",
      question: "Which word is closest in meaning to 'enormous'?",
      options: ["tiny", "huge", "average", "narrow"],
      answer: "huge"
    },
    {
      id: "s2",
      type: "synonyms",
      question: "Which word is closest in meaning to 'sufficient'?",
      options: ["extra", "lacking", "enough", "excess"],
      answer: "enough"
    },
    {
      id: "s3",
      type: "synonyms",
      question: "Which word is closest in meaning to 'exhausted'?",
      options: ["excited", "energetic", "very tired", "well rested"],
      answer: "very tired"
    },
    {
      id: "s4",
      type: "synonyms",
      question: "Which word is closest in meaning to 'cautious'?",
      options: ["reckless", "careful", "brave", "careless"],
      answer: "careful"
    },
    {
      id: "s5",
      type: "synonyms",
      question: "Which word is closest in meaning to 'transparent'?",
      options: ["hidden", "confusing", "clear", "colorful"],
      answer: "clear"
    },
    {
      id: "s6",
      type: "synonyms",
      question: "Which word is closest in meaning to 'principal'?",
      options: ["minor", "main", "original", "additional"],
      answer: "main"
    },
    {
      id: "s7",
      type: "synonyms",
      question: "Which word is closest in meaning to 'acquire'?",
      options: ["lose", "ask", "gain", "give"],
      answer: "gain"
    },
    {
      id: "s8",
      type: "synonyms",
      question: "Which word is closest in meaning to 'maintain'?",
      options: ["destroy", "keep up", "improve", "reduce"],
      answer: "keep up"
    },
    {
      id: "s9",
      type: "synonyms",
      question: "Which word is closest in meaning to 'diverse'?",
      options: ["similar", "uniform", "varied", "equal"],
      answer: "varied"
    },
    {
      id: "s10",
      type: "synonyms",
      question: "Which word is closest in meaning to 'demonstrate'?",
      options: ["deny", "hide", "show", "question"],
      answer: "show"
    }
  ],

  reading: [
    // PASSAGE 1 (B1)
    {
      id: "r1",
      type: "reading",
      passage: "passage1",
      question: "What is the main topic of the passage?",
      options: [
        "The benefits of traditional classroom learning",
        "The rise and impact of online learning",
        "Problems with internet access in education",
        "How teachers use technology at home"
      ],
      answer: "The rise and impact of online learning"
    },
    {
      id: "r2",
      type: "reading",
      passage: "passage1",
      question: "According to the passage, what is one advantage of online learning mentioned?",
      options: [
        "It is always free of charge",
        "Students can learn at their own pace and schedule",
        "It guarantees better job opportunities",
        "It eliminates the need for teachers"
      ],
      answer: "Students can learn at their own pace and schedule"
    },
    {
      id: "r3",
      type: "reading",
      passage: "passage1",
      question: "The word 'accessible' in the passage most likely means:",
      options: ["expensive", "available and easy to reach", "complicated", "temporary"],
      answer: "available and easy to reach"
    },
    {
      id: "r4",
      type: "reading",
      passage: "passage1",
      question: "What challenge does the passage mention about online learning?",
      options: [
        "Students find the content too easy",
        "Not all students have reliable internet or devices",
        "Online courses are too short",
        "Teachers don't know how to use technology"
      ],
      answer: "Not all students have reliable internet or devices"
    },
    {
      id: "r5",
      type: "reading",
      passage: "passage1",
      question: "Based on the passage, what can be inferred about the future of education?",
      options: [
        "Traditional schools will completely disappear",
        "Online learning will likely continue to play an important role",
        "Students will stop using technology in classrooms",
        "Teachers will no longer be needed"
      ],
      answer: "Online learning will likely continue to play an important role"
    },
    // PASSAGE 2 (B2)
    {
      id: "r6",
      type: "reading",
      passage: "passage2",
      question: "What is the author's main argument in the passage?",
      options: [
        "Critical thinking is not important for modern education",
        "Memorizing facts is the best way to prepare students",
        "Education should develop students' ability to think critically",
        "Technology will solve all problems in education"
      ],
      answer: "Education should develop students' ability to think critically"
    },
    {
      id: "r7",
      type: "reading",
      passage: "passage2",
      question: "According to the passage, what does 'rote memorization' mean?",
      options: [
        "Learning through creative projects",
        "Repeating information until it is memorized without deep understanding",
        "Discussing ideas in groups",
        "Reading many different books"
      ],
      answer: "Repeating information until it is memorized without deep understanding"
    },
    {
      id: "r8",
      type: "reading",
      passage: "passage2",
      question: "The word 'cultivate' as used in the passage most closely means:",
      options: ["to plant crops", "to develop and encourage over time", "to measure accurately", "to test repeatedly"],
      answer: "to develop and encourage over time"
    },
    {
      id: "r9",
      type: "reading",
      passage: "passage2",
      question: "Which of the following best describes the author's tone in the passage?",
      options: ["Neutral and descriptive", "Strongly critical and negative", "Persuasive and advocating for change", "Humorous and informal"],
      answer: "Persuasive and advocating for change"
    },
    {
      id: "r10",
      type: "reading",
      passage: "passage2",
      question: "What skill does the author suggest schools should prioritize alongside content knowledge?",
      options: [
        "Speed reading",
        "Artistic creativity",
        "The ability to analyze and evaluate information",
        "Competitive test-taking"
      ],
      answer: "The ability to analyze and evaluate information"
    }
  ]
};

const PASSAGES = {
  passage1: {
    title: "The Rise of Online Learning",
    text: `Over the past decade, online learning has transformed the way people access education around the world. What was once limited to traditional classrooms has now expanded to digital platforms, making knowledge more accessible to millions of people regardless of their location or background.

One of the most significant advantages of online learning is flexibility. Students can learn at their own pace and schedule lessons around their personal and professional lives. This is particularly beneficial for working adults who wish to develop new skills without leaving their jobs. Furthermore, online courses are often more affordable than traditional education, reducing financial barriers for many learners.

However, online learning is not without its challenges. Not all students have reliable internet connections or appropriate devices at home, which creates inequality in access to education. Additionally, some learners struggle with motivation and self-discipline when studying independently, without the structure of a physical classroom and direct interaction with teachers and classmates.

Despite these challenges, experts believe that online learning will continue to grow and evolve. Many educational institutions are now adopting a blended approach — combining online and face-to-face learning — to offer the best of both worlds. As technology continues to advance, it is likely that online education will become an even more important part of how we learn throughout our lives.`
  },
  passage2: {
    title: "Beyond Facts: The Case for Critical Thinking in Education",
    text: `For generations, education systems around the world have placed enormous emphasis on the transmission of knowledge — the delivery of facts, dates, formulas, and procedures from teacher to student. While foundational knowledge remains essential, there is a growing recognition among educators and researchers that this approach alone is insufficient for preparing students for the complexities of the modern world.

The problem with an education built primarily around rote memorization is that it produces students who can recall information but struggle when asked to apply it in unfamiliar contexts. In a world where information is abundantly available at the touch of a screen, the ability to retrieve facts matters far less than the ability to evaluate, synthesize, and use them meaningfully.

What schools must prioritize, therefore, is the cultivation of critical thinking — the capacity to question assumptions, examine evidence from multiple perspectives, identify logical fallacies, and construct well-reasoned arguments. These are not skills that emerge naturally; they must be deliberately taught and consistently practiced across all subjects and age groups.

This does not mean abandoning content knowledge. Rather, it means using content as a vehicle for developing deeper cognitive abilities. A history lesson, for instance, should not only cover what happened, but challenge students to consider why it happened, whose perspectives are represented, and what lessons can be drawn. An English class should do more than teach grammar rules — it should cultivate the ability to read critically, argue persuasively, and communicate with clarity and precision.

The educators who will make the greatest difference in the coming decades are those who understand that their role is not merely to deliver information, but to build thinkers.`
  }
};
