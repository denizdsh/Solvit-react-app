export const API_URL = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_LOCAL_API_URL
    : process.env.REACT_APP_REMOTE_API_URL

export const categories = [
    'JavaScript',
    'Java',
    'C#',
    'Python',
    'C++',
    'PHP',
    'DevOps',
    'QA',
    'Front-End',
    'React',
    'jQuery',
    'Angular',
    'Vue.js',
    'Back-End',
    'Node.js',
    'Spring',
    'ASP.NET',
    'Django',
    'Other'
];