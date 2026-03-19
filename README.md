***GITHUB PUBLIC REPOSITORY LINK***

https://github.com/ethandreyes/TensorWave-CodeChallenge

***ETHAN REYES - TENSORWAVE SOFTWARE ENGINEERING CODE CHALLENGE 3/16/26 - 3/19/26***

Key Notes: This project completes the code-challenge built with Next.js that demonstrates dynamic routing, API integration, and handling of rate limiting and data fetching. The application is structured with scalability and performance in mind, separating client-side and server-side responsibilities. API rate limitations were addressed through caching and client-side fetching strategies. The UI/UX was iteratively refined to improve usability and clarity. I attempted deployment using Vercel, but due to API rate limits on the free tier, full functionality could not be demonstrated because of my overused API key. An `.env.local` file was used to securely store the API key and is not included in this repository.

1. Overview: Create a React application (Next.js preferred but not required). If you end up using Next.js, choose either the app or pages router. Both are acceptable for this coding challenge.
      - Implemented using the Next.js App Router. Developed with TypeScript and CSS. This project involved learning and applying core concepts of React and Next.js, including dynamic routing, component structure, and data flow management.

2. Display at least 15 stocks (tickers) of your choosing on the homepage in one of the following formats: Table, Tiles, Cards
      - Displayed 15 stock tickers using a tile-based layout, designed to enhance clarity, accessibility, and overall user experience.

3. If a user clicks on any one of the stocks (tickers) on your homepage route them to the stock details page, requirements for which are outlined below.
      - Each stock tile routes to a dedicated stock details page using dynamic routing. A back button is included to allow seamless navigation to the homepage.

4. On the stock details page...
      - All requirements were implemented. Company overview data is fetched server-side and cached to reduce unnecessary API calls, while `TIME_SERIES_DAILY` data is fetched client-side to manage API rate limits efficiently. Additional formatting and conditional rendering were applied to ensure consistent and readable data presentation.

5. Style each page it looks nice and presentable, be creative :)
      - Focused on creating a clean, structured, and user-friendly interface. Implemented interactive elements, consistent spacing, and visual hierarchy to improve usability and overall experience.

6. Bonus Points:
      - Integrated company logos on both the homepage and their respective stock details pages.
      - Implemented a loading indicator while fetching `TIME_SERIES_DAILY` data to provide clear user feedback during asynchronous operations.

***Running Locally***
1. Clone repo
2. npm install
3. Create `env.local` with API key variable `ALPHA_VANTAGE_API_KEY`
4. npm run dev
5. Navigate to http://localhost:3000

If there are any questions feel free to reach out.
Ethan.D.Reyes25@gmail.com
