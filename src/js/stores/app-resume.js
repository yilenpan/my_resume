var projects = {
    "projects" :    [
            {
                "title" : "Personal Blog",
                "datesWorked" : "6/2014-7/2014",
                "description" : "Built with Google App Engine and Python: http://skillful-elf-757.appspot.com/",
                "images" : "images/blog.png"
            },
            {
                "title" : "Pantomics",
                "datesWorked" : "1/2015-Present",
                "description" : "Built with Google App Engine and Python",
                "images" : "images/pantomics.png"
            },
            {
                "title" : "Ask a Fighter",
                "datesWorked" : "2011",
                "description" : "Video Blogging the LA Fight Scene: www.youtube.com/yiplandar",
                "images" : "images/askafighter.png"
            }
        ]
};

var bio = {
    "name" : "Yilen Pan",
    "role" : "Front-End/Full-Stack wannabe",
    "skills" : ["Ruby", "Javascript",
                "HTML", "Python", "Ruby on Rails",
                "Twitter Bootstrap"],
    "contact" : {
        "email" : "Yilen.Pan@gmail.com",
        "phone" : "510-207-9833",
        "github" : "yilenpan",
        "twitter" : "@YiPz",
        "location" : "Oakland, CA, USA"
        },
    "biopic" : "images/fry.jpg",
    "welcomeMessage" : "Welcome to my resume!"
};

var work = {
    "jobs" : [
        {
            "employer" : "Pantomics",
            "title" : "Marketing Consultant",
            "location" : "Richmond, CA, USA",
            "dates" : "Jan 2015 - Present",
            "description" : "Marketing strategist for a leading Tissue Array company"
        },
        {
            "employer" : "Juren Motion Pictures",
            "title" : "Staff Writer",
            "location" : "Beijing, China",
            "dates" : "May 2014 - Jan 2015",
            "description" : "Headed screenwriting team for a Junren Motion Pictures, resulting in eight short films and a feature length screenplay"
        },
        {
            "employer" : "Lyft",
            "title" : "Driver",
            "location" : "Los Angeles, CA, USA",
            "dates" : "June 2013 - April 2014",
            "description" : "Driver for popular Lyft ride-sharing service"
        },
        {
            "employer" : "Paul Pompian Productions",
            "title" : "Assistant to Producer",
            "location" : "Los Angeles, CA, USA",
            "dates" : "Mar 2010 - Aug 2011",
            "description" : "Assistant to the Producer"
        },
        {
            "employer" : "Valhalla Motion Pictures",
            "title" : "Intern",
            "location" : "Los Angeles, CA, USA",
            "dates" : "Oct 2009 - Mar 2010",
            "description" : "Development Intern / Receptionist for The Walking Dead"
        }
    ]
};


var education = {
    "schools" : [
        {
            "name" : "American Film Institute",
            "location" : "Los Angeles, CA, USA",
            "major" : "Screenwriting Fellow",
            "degree" : "MFA",
            "minor" : "",
            "years" : "2011-2013"
         },
         {
            "name" : "UC Riverside",
            "location" : "Riverside, CA, USA",
            "major" : "Creative Writing",
            "minor" : "Film and Media",
            "degree" : "BA",
            "years" : "2005-2009"
         }
        ],
    "onlineCourses" : [
         {
            "title" : "Front-End Nanodegree",
            "school" : "Udacity",
            "location" : "San Francisco, CA, USA",
            "date" : "2015",
            "url" : "www.udacity.com"
         }
    ]
};

var Data = {
    bio: bio,
    projects: projects,
    education: education
};


module.exports = Data;





