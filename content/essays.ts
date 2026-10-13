export type Block = { type: "p" | "quote" | "thanks" | "lead"; text: string; lead?: string };

export type Translation = {
  slug: string;
  label: string;
  back: string;
  title: string;
  date: string;
  body: Block[];
};

export type Essay = {
  slug: string;
  title: string;
  date: string;
  body: Block[];
  notes?: string[];
  translations?: Translation[];
};

export type Section = {
  slug: "essays" | "throwaway";
  label: string;
  title: string;
  intro: string;
  introLinks: boolean;
  essays: Essay[];
};

const p = (text: string): Block => ({ type: "p", text });
const quote = (text: string): Block => ({ type: "quote", text });
const thanks = (text: string, leadText = "Thanks"): Block => ({ type: "thanks", lead: leadText, text });
const lead = (leadText: string, text: string): Block => ({ type: "lead", lead: leadText, text });

const essays: Essay[] = [
  {
    slug: "lang",
    title: "Why Programming Languages Fail I",
    date: "September 2026",
    body: [
      p("Assuming artificial intelligence will become a super intelligence someday, I believe all present programming languages will be obsolete for practical use."),
      p("I know this sounds preposterous to say but whenever I see people gamify understanding their own code, claim reading code no longer matters, or build agent systems with infinite tests, I convince myself people will understand where I come from."),
      p("I don't think coding is doomed. I just think all of the previous examples are coping mechanisms that exist because we lack tools."),
      p("For the last few months, I've been building a new programming language that survives AI superintelligence. A very daunting task that present programming forced me to work on. And in my journey, I found three reasons why programming languages won't work like they used to anymore: they lack a structure that scales understanding, they don't scale searching for information and they force upon us a fixed layer of abstraction."),
      p("These were not problems when languages were used only by humans. Before, coding meant understanding what I wrote. Now that AI writes code at exponential volumes, it's easier to ask it to write and to explain code. However, in the long run this has delegated my understanding to AI. What's worse, I can't go back because coding by hand isn't efficient anymore. Describing what I want to AI always seems to be faster than writing lines of code. Which made me think a new language was impossible. It didn't matter what design rules I came up with, I always could imagine a scenario where I couldn't understand the code because of the infinite number of lines AI would write. What I wanted was a language that scales understanding as lines of code increase."),
      p("Exponential code output also means we now need to ask AI questions about our codebase. But asking questions and reading code are different. Asking AI to search and update code makes you over time incapable of finding the right code and updating it yourself. It makes you once again lend to another intelligence your understanding. Contemporary language designs again do not help here. The logic you need most likely lives in multiple files and lines of code. So if we assume our codebase is infinite then we are forced to use AI to search."),
      p("I've come to the conclusion that a language must make it easy to find where the change you want to make is. I find it curious that before AI, we had this issue too but text matching and static analysis were enough. Back then we had human level lines of code and we could trust the language to set the scope of what a human must understand."),
      p("It's obvious programming languages live in a fixed layer of abstraction. Assembly requires you to understand registers. C++ asks you to understand memory but not registers. High level languages like Python need you to think with imperative logic and not worry so much about memory. This has been the case for so long it's become a feature of language design. It's unthinkable it can be any different. What would happen if you could somehow create pointers in Python or use registers in React. Would it even make sense? Of course not. A language should have a defined layer of abstraction that a human can understand and produce human amounts of output using it. But you see the problem now? It's the same problem from before. A language with a fixed layer of abstraction is unusable in the AI era. Whatever abstraction scope you design for a language, AI will produce infinite lines of code on that level and beat you to understand it."),
      p("All three problems: understanding at scale, fast searching in the codebase and fixed layers of abstraction, need to be solved. Leaving just any one left is enough to make a new language unusable. Though interestingly after solving all three, I noticed that in theory I just needed to solve any of them to get them all."),
      p("But do these problems actually have a solution? If so, how do we start fixing them? Thankfully in 2003, Paul Graham in his essay [“The Hundred-Year Language”](https://paulgraham.com/hundred.html) came up with two simple design ideas that I needed to create my new language. The first idea was:"),
      quote("One way to design a language is to just write down the program you'd like to be able to write, regardless of whether there is a compiler that can translate it or hardware that can run it."),
      p("His second idea included a warning:"),
      quote("What program would one like to write? Whatever is least work. Except not quite: whatever would be least work if your ideas about programming weren't already influenced by the languages you're currently used to. Such influence can be so pervasive that it takes a great effort to overcome it. … One helpful trick here is to use the length of the program as an approximation for how much work it is to write. Not the length in characters, of course, but the length in distinct syntactic elements -- basically, the size of the parse tree."),
      p("Both together yield the simplest question: is there a way to write something short and that I'd wish to write? Turns out the answer is yes."),
      thanks("to Cristhian Agüero and Matias Avendaño for reading drafts of this.")
    ],
    translations: [
      {
        slug: "es",
        label: "Spanish Translation",
        back: "English Translation",
        title: "Por qué fallan los lenguajes de programación I",
        date: "Septiembre de 2026",
        body: [
          p("Asumiendo que la inteligencia artificial se convertirá en superinteligencia algún día, creo que todos los lenguajes de programación que ahora existen quedarán obsoletos de forma práctica."),
          p("Sé que suena absurdo decir algo así, pero cuando veo a personas gamificar entender su propio código, afirmar que leer código ya no importa o construir sistemas agénticos con pruebas infinitas, me convenzo de que los demás entenderán este punto de vista."),
          p("No creo que programar esté muerto. Solo creo que todos los ejemplos anteriores son mecanismos que existen para lidiar con una falta de herramientas."),
          p("Durante los últimos meses he estado diseñando un nuevo lenguaje de programación que sobreviva a una superinteligencia. Una tarea bastante intimidante que la programación actual me obligó a intentar."),
          p("Y en este camino encontré tres razones por las que los lenguajes de programación ya no funcionan como antes:"),
          p("Carecen de una estructura que escale entender, no escalan buscar información y fuerzan una capa de abstracción fija."),
          p("Estos no eran problemas cuando los lenguajes eran usados solo por humanos. Antes, programar significaba entender lo que yo escribía. Ahora que la IA escribe código en un volumen exponencial, es más fácil pedirle que escriba y explique su código."),
          p("Sin embargo, a largo plazo esto ha delegado mi entendimiento a la IA. Peor aún, no puedo volver atrás porque programar a mano ya no es eficiente. Describirle a la IA lo que quiero siempre parece más rápido que escribir líneas de código."),
          p("Esto me hizo pensar que un nuevo lenguaje era imposible. No importaba qué reglas de diseño se me ocurrieran, siempre podía imaginar un escenario en el que no entendería el código por la cantidad infinita de líneas que escribiría la IA."),
          p("Lo que quería era un lenguaje que escale entender a medida que aumentan las líneas de código. Producir código exponencialmente también significa que ahora necesitamos hacerle preguntas a la IA sobre nuestro código. Pero preguntar sobre y leer el código son cosas distintas."),
          p("Pedirle a la IA que busque y cambie código te vuelve, con el tiempo, incapaz de encontrar el código correcto y cambiarlo tú mismo. Te hace, una vez más, entregar tu entendimiento a otra inteligencia."),
          p("Y de nuevo, los lenguajes contemporáneos no ayudan aquí. La lógica que necesitas buscar muy probablemente vive en múltiples archivos y líneas de código. Así que, si asumimos que nuestro código es infinito, nos vemos forzados a usar la IA para buscar código."),
          p("He llegado a la conclusión de que un lenguaje debe hacer fácil encontrar dónde está el cambio que quieres hacer. Me parece curioso que antes de la IA también teníamos este problema, pero la búsqueda por texto y el análisis estático bastaban."),
          p("En ese entonces teníamos cantidades humanas de código y podíamos confiar en que el lenguaje delimitara el alcance de lo que un humano debe entender."),
          p("Es obvio que los lenguajes de programación viven en una capa fija de abstracción. Assembly te exige entender registros. C++ te pide entender memoria, pero no registros. Los lenguajes de alto nivel como Python te piden pensar con lógica imperativa y no preocuparte tanto por la memoria. Ha sido así por tanto tiempo que se ha vuelto una cualidad obvia del diseño de lenguajes. Es impensable que pueda ser de otra forma."),
          p("¿Qué pasaría si de alguna manera pudieras crear punteros en Python o usar registros en React? ¿Tendría siquiera sentido? Por supuesto que no."),
          p("Un lenguaje debería definir una capa de abstracción que un humano pueda entender y con la que este ser humano pueda escribir un número humano de líneas de código. ¿Pero ves ahora el problema? Es el mismo problema de antes. Un lenguaje con una capa fija de abstracción es inutilizable en la era de la IA."),
          p("Sea cual sea el alcance de abstracción que diseñes para un lenguaje, la IA producirá infinitas líneas de código en ese nivel y superará tu capacidad para entenderlo."),
          p("Estos tres problemas: entender código a escala, buscar información rápido en el código base y las capas fijas de abstracción, deben resolverse. Dejar sin resolver aunque sea una basta para que un nuevo lenguaje sea inutilizable. Aunque es curioso que, después de resolver los tres, puedo decir que en teoría solo necesitaba resolver cualquiera de ellos para resolverlos todos."),
          p("¿Pero estos problemas realmente tienen solución? Y si la tienen, ¿cómo empezamos a resolverlos?"),
          p("Por suerte, en 2003, Paul Graham, en su ensayo [“El lenguaje de los cien años”](https://paulgraham.com/hundred.html) (“The Hundred-Year Language”), propuso las dos ideas de diseño simples que yo necesitaría para crear mi nuevo lenguaje."),
          p("La primera idea es:"),
          quote("Una forma de diseñar un lenguaje es simplemente escribir el programa que te gustaría poder escribir, sin importar si existe un compilador que pueda traducirlo o hardware que pueda ejecutarlo."),
          p("Su segunda idea incluía una advertencia:"),
          quote("¿Qué programa le gustaría a uno escribir? El que menos trabajo cueste. Aunque no exactamente: es el que menos trabajo costaría si tus ideas sobre la programación no estuvieran ya influenciadas por los lenguajes a los que estás acostumbrado. Esa influencia puede estar tan extendida que superarla requiere un gran esfuerzo. … Un truco útil aquí es usar la longitud del programa como una aproximación de cuánto trabajo cuesta escribirlo. No la longitud en caracteres, por supuesto, sino la longitud en elementos sintácticos distintos; básicamente, el tamaño del árbol sintáctico."),
          p("Ambas ideas juntas, forman la más simple de las preguntas: ¿Hay una forma de escribir poco y que quiera escribir? Resulta que la respuesta es sí."),
          thanks("a Cristhian Agüero y Matias Avendaño por leer los borradores de este ensayo.", "Gracias")
        ]
      }
    ]
  }
];

const throwaway: Essay[] = [
  {
    slug: "cs",
    title: "Why to Study Computer Science",
    date: "June 2024",
    body: [
      p("When I decided to study computer science I just wanted to understand problems using logic. I didn't expect curiosity and creativity to be so rewarded. I also didn't expect to benefit so much from studying it."),
      p("Learning how to program computers and making money coding are the obvious benefits people want. But there are also benefits I wished I had noticed sooner. These benefits are the reason I am writing this essay."),
      lead("Freedom.", "Because it is easy to associate computer science with programming, it is also easy to imagine \u201cfreedom\u201d as working from your laptop on a Caribbean beach. This example of \u201cfreedom\u201d is real but it does not capture the whole picture."),
      p("Computer science is transversal to all scientific fields. This means it is relevant to all college degrees you could study. And surprisingly, this also means you can benefit from all the opportunities each degree provides. Studying computer science allows you to work on biotech, design or whatever you want."),
      p("Having so much freedom gets scary at first but there is no going back once you fall in love with it."),
      lead("Intellectual curiosity.", "Computer science being relevant to everything tickles intellectual curiosity very hard. All of a sudden you can do so much and sometimes you feel sad you cannot do all of it."),
      p("People will ask you for help with their projects and oftentimes what they do will be very interesting. From crop harvesting prediction using machine learning models to building bots to make bets."),
      lead("Meeting interesting people.", "It is important to meet people you look up to. It's beneficial because it expands your ideas of what you can do."),
      p("Almost all of the people I respect and find interesting either studied, self-studied or want to study computer science. Of course I am biased because all of my experiences have revolved around college. But after I dropped out 1.5 years ago, the people I met outside of academia continued to follow this rule."),
      lead("Global.", "When you build something that helps an Indian guy from Telangana and also helps your friends from college, it hits differently. It expands your thinking. In contrast, unless you can afford to study abroad, in most fields, the work you can do will be local to your country or city."),
      lead("Cheap.", "Most of computer science relates to software and abstract stuff. This means most of the things you will be doing are also cheap to do. If they are not cheap enough, they will be cheaper over time."),
      p("Computer science is an acquired taste. The first few years can feel too much. But over time you will be free to explore all other fields you find interesting. And if you like a field enough, switching from computer science will be easy. So if you do not know what to study, computer science is the best starting point I can think of.")
    ]
  }
];

export const sections: Section[] = [
  { slug: "essays", label: "Essays", title: "Essays", intro: "If you're not sure which to read, try", introLinks: true, essays },
  { slug: "throwaway", label: "Throwaway", title: "Throwaway", intro: "Writings not meant to be read but kept anyway.", introLinks: false, essays: throwaway }
];

export function getSection(slug: string) {
  return sections.find((section) => section.slug === slug);
}

export function getEssay(sectionSlug: string, essaySlug: string) {
  return getSection(sectionSlug)?.essays.find((essay) => essay.slug === essaySlug);
}

export function getTranslation(sectionSlug: string, essaySlug: string, lang: string) {
  return getEssay(sectionSlug, essaySlug)?.translations?.find((translation) => translation.slug === lang);
}

export const latest = { section: sections[0], essay: essays[0] };
