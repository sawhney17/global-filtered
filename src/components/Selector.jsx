import React from 'react'

export const Selector = () => {

    // Functionality of the app is here
    // 1. A list is populated with the feed options
    // 2. The user can select a feed from the list
    // 3. If the user doesn't like the feeds, they can type a custom feed
    // 4. The user can save their preferences
    // 5. This will update the user's feed 


    // 1. Use the "use State function to create a tracker for the feed options"

   

    // 2. Creawte a tracker for the selected feed using the "useState" function, set the default to the first one


     // Challenge task: Research how to use chrome localStorage to save the user's preferences
    // Implement it using the "useEffect" function, so that every time a change is made to the feed it is saved to localStorage

    // 3. Use the useState function to create a tracker for the name and URL of the new feed


  return (
    <div>
      <h1>Selector</h1>

      {/* Use the map function to map the list you created with useState  */}
      {/* you can make it a list with <ul> and <li> */}
        {/* Use the "onClick" function to update the selectedFeed when the user clicks a feed */}
        {/* Use the "value" function to set the feed to the selected feed */}

        
        
        {/*4. Display, after the map function the selected feed. this should jsut render the selected feed */}

        {/* 4. Create two text fields and a create button */}
        {/* Ensure that you use onChange to update teh state of the trackers every time one of them is changed. You shoudl also set value to tracker(this will let you clear it later) */}
        {/* Call a handleSubmit function when the button is clicked */}
        
    </div>
  )
}