export interface ResponseInterface {
  message: String[];
  options: String[];
}

export const Response = async (
  res: String,
  question?: String
): Promise<ResponseInterface> => {
  switch (res) {
    case 'Want to know an interesting coding fact?': {
      const facts = [
        'There are around 700 separate programming languages',
        'According to many online studies, the most disliked programming languages are Perl, Delphi, and VBA',
        'Recent studies show that around 70% of coding jobs have nothing to do with technology at all',
        "The world's first computer programmer was a renowned female mathematician",
        'Computer Programming was instrumental in helping end World War II',
        'The first computer virus was created in 1986',
        'The first programming language was called FORTRAN',
        'Many owners of large tech companies loved video games as kids',
        'There are 3 very different types of Hackers, one being malicious, the other benevolent, and the last somewhere in between the two',
        'The first-ever computer game made zero profit for its team of creators',
        'NASA still uses programs from the 70s in their spacecraft',
        'The first computer “bug” was an actual real-life bug',
      ];

      const randomFact = facts[Math.floor(Math.random() * facts.length)];

      return {
        message: [randomFact, 'Do you wanna continue?'],
        options: ['Yes', 'No'],
      };
    }
    case 'Know more about your favorite programming language': {
      const languages = ['Javascript', 'Java', 'Python', 'C / C++', 'Rust'];

      return { message: ['Choose a language'], options: languages };
    }
    case 'Ask a question about any programming language': {
      const results = await fetch(
        `http://api.serpstack.com/search?access_key=e21fd033ce284d9a0a72fc623fbf97f2&query=${question}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json());

      return {
        message: [
          `Click on the link to know more: <a href=${
            results.request.search_url
          } target='_blank'>${
            results.request.search_url ? results.request.search_url : ''
          }</a>`,
          'Do you wanna continue?',
        ],
        options: ['Yes', 'No'],
      };
    }
    case 'Javascript': {
      return {
        message: [
          `
        JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.
        `,
          'JavaScript took just 10 days to develop.',
          'JavaScript was probably named after Java.',
          'GitHub says JavaScript is the Most Popular language in the world.',
          'JavaScript is responsible for Web2, precursor to Web3.',
          'JavaScript has many implementations, but a single “owner”: ECMA.',
        ],
        options: ['Yes', 'No'],
      };
    }
    case 'Java': {
      return {
        message: [
          `
          Java is a high-level, class-based, object-oriented programming language. It is a general-purpose programming language intended to let programmers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need to recompile.
        `,
          'Java was called Oak at the beginning.',
          'It was just an accident!',
          'Second most popular language.',
          'Most popular user interface.',
          'Final is not final in Java.',
        ],
        options: ['Yes', 'No'],
      };
    }
    case 'Python': {
      return {
        message: [
          `
          Python is a high-level, interpreted, general-purpose programming language. Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms.
        `,
          'Python follows chain comparison.',
          'Functions in Python can return multiple values.',
          'Python does not need compiler.',
          'Python has a variant of C and Java.',
          'Python can implement the ‘else’ clause within ‘for’ loop.',
        ],
        options: ['Yes', 'No'],
      };
    }
    case 'C / C++': {
      return {
        message: [
          `
          C is a general-purpose computer programming language. It was created in the 1970s by Dennis Ritchie.
        `,
          'C++ is a general-purpose programming language created by Danish computer scientist Bjarne Stroustrup as an extension of the C programming language, or "C with Classes".',
          'C++ was First Standardized in 1998.',
        ],
        options: ['Yes', 'No'],
      };
    }
    case 'Rust': {
      return {
        message: [
          `
          Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.
        `,
          'Rust Is Fast.',
          'Documentation is critical for adoption.',
          'Blockchain is a Rusty hotbed.',
          'Most people use Rust for web apps, srsly!.',
        ],
        options: ['Yes', 'No'],
      };
    }
    case 'Yes': {
      return {
        message: ['Choose any one of the options below'],
        options: [
          'Want to know an interesting coding fact?',
          'Know more about your favorite programming language',
          'Ask a question about any programming language',
        ],
      };
    }
    case 'No': {
      return {
        message: ['Hope I was of some help to you', 'Visit Again'],
        options: [],
      };
    }
    default:
      return {
        message: [
          `Hi ${res}! Hope you have a great day!`,
          'Choose any one of the options below',
        ],
        options: [
          'Want to know an interesting coding fact?',
          'Know more about your favorite programming language',
          'Ask a question about any programming language',
        ],
      };
  }
};
