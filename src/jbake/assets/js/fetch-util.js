
export async function fetchData(fetchUrl) {
    try {
         let response = await fetch(fetchUrl);
         let data = await response.json();
          return data;
     } catch (error) {
      console.log("Error:", error);
    }
}