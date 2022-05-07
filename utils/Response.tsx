interface ResponseType {
  message: String | String[];
  options: String[];
}

export const Response = (res: String, question?: String): ResponseType => {
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

      return { message: 'Choose a language', options: languages };
    }
    case 'Ask a question about any programming language': {
      const resultsFunc = async () => {
        const results = await fetch(
          `http://api.serpstack.com/search?access_key=e21fd033ce284d9a0a72fc623fbf97f2&query=${question}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then((res) => res.json());

        if (results.request.search_url) {
          return await results.request.search_url;
        } else {
          return 'www.google.com';
        }
      };

      return {
        message: [
          `Click on the link to know more: ${resultsFunc}`,
          'Do you wanna continue?',
        ],
        options: ['Yes', 'No'],
      };
    }
    case 'Javascript': {
      return {
        message: [
          `
        JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles. Read more about JavaScript.
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
          Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let programmers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need to recompile.
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
          Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.
          Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured (particularly procedural), object-oriented and functional programming. It is often described as a "batteries included" language due to its comprehensive standard library.
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
          C is a general-purpose computer programming language. It was created in the 1970s by Dennis Ritchie, and remains very widely used and influential. By design, C's features cleanly reflect the capabilities of the targeted CPUs. It has found lasting use in operating systems, device drivers, protocol stacks, though decreasingly for application software, and is common in computer architectures that range from the largest supercomputers to the smallest microcontrollers and embedded systems.
        `,
          'C++ (/ˌsiːˌplʌsˈplʌs/) is a general-purpose programming language created by Danish computer scientist Bjarne Stroustrup as an extension of the C programming language, or "C with Classes". The language has expanded significantly over time, and modern C++ now has object-oriented, generic, and functional features in addition to facilities for low-level memory manipulation.',
          'C Language was not called C at the beginning. It has been named as C after passing many stages of evolution.',
          'We can ignore input in scanf() by using an ‘*’ after ‘%’ in format specifiers.',
          'C++ Influenced Many Other Programming Languages.',
          'C++ was First Standardized in 1998.',
        ],
        options: ['Yes', 'No'],
      };
    }
    case 'Rust': {
      return {
        message: [
          `
          Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency. It is syntactically similar to C++, but can guarantee memory safety by using a borrow checker to validate references. It achieves memory safety without garbage collection, and reference counting is optional. It is a systems programming language with mechanisms for low-level memory management, but also offers high-level features such as functional programming.
        `,
          'Rust Is Fast.',
          'Documentation is critical for adoption.',
          'Blockchain is a Rusty hotbed.',
          'Most people use Rust for web apps, srsly!.',
        ],
        options: ['Yes', 'No'],
      };
    }
    case 'Yes' || 'No': {
      return {
        message: '',
        options: [
          'Want to know an interesting coding fact?',
          'Know more about your favorite programming language',
          'Ask a question about any programming language',
        ],
      };
    }
    default:
      return {
        message: `Hi ${res}! Hope you have a great day!`,
        options: [
          'Want to know an interesting coding fact?',
          'Know more about your favorite programming language',
          'Ask a question about any programming language',
        ],
      };
  }
};
