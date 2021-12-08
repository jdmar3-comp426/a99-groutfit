We were able to create several functions that all came together to form our game's
front end portion. It gets various quotes from a free API I found online ( http://api.quotable.io/random ). The fetchQuote() and newQuote() are used
to fetch the quote from the API and display it on the screen. StartTime() and getTimerTime() are used to start the timer and keep continuously counting. 
Lastly, I used addEventListener() to take note of any changes. To act upon changes, each index of the letter typed is compared to the each corresponding 
index in the found quote. For each letter, if the letter is correct, the color is changed to different colors : (green if it's right and red if it's incorrect).
In this method call, we also keep track of how many letters are incorrect so we can display the number of errors and use this to calculate and display the rate
typing by words per minute. Then, when both the typed quote and displayed quote have the same length, a new quote is rendered.
