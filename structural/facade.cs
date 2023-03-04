// Facade Design Pattern
// ----------------------

// The Facade Design Pattern provides a unified 
// interface to a set of interfaces in a subsystem.
// Facade defines a higher-level interface that makes 
// the subsystem easier to use.

// Facade is a structural design pattern that provides
// a simplified interface to a library, a framework,
// or any other complex set of classes.

// for example using fetch() in JS :)

// Problem:
// Imagine that you are working on a project that uses a
// complex library with a large class hierarchy. You
// don't need the full power of the library, but only a
// small part of it. In this case, you can simplify the
// library's interface by creating a Facade class.

using System;

namespace ResumeParsing
{
    // Complex library class hierarchy
    public class ResumeParser
    {
        public string getText(string resume)
        {
            // Parsing resume text using NLP
            Console.WriteLine("Parsing resume text using NLP...");
            return "Resume text";
        }

        public string parseExperience(string resumeText)
        {
            // Parsing experience from resume text
            Console.WriteLine("Parsing experience from resume text...");
            return "Experience";
        }

        public string parseName(string resumeText)
        {
            // Parsing name from resume text
            Console.WriteLine("Parsing name from resume text...");
            return "Name";
        }

        // Other methods for parsing skills, education, etc.
    }

    // Facade class that simplifies the interface of the ResumeParser library
    public class ResumeFacade
    {
        private readonly ResumeParser _resumeParser;

        public ResumeFacade()
        {
            _resumeParser = new ResumeParser();
        }

        public string ParseResume(string resume)
        {
            // Simplified interface for parsing resume
            var resumeText = _resumeParser.getText(resume);
            var experience = _resumeParser.parseExperience(resumeText);
            var name = _resumeParser.parseName(resumeText);
            return $"Resume parsing complete for {name} with {experience} experience.";
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var resume = "Ali Mohammad's resume";
            var facade = new ResumeFacade();
            var result = facade.ParseResume(resume);
            Console.WriteLine(result);
        }
    }
}

// Use the Facade pattern when you need to have a limited but
// straightforward interface to a complex subsystem.
// Use the Facade when you want to structure a subsystem into layers.