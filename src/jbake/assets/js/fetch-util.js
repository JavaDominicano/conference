
export async function fetchData(fetchUrl) {
    try {
         let response = await fetch(fetchUrl);
         let data = await response.json();
          return data;
     } catch (error) {
      console.log("Error:", error);
    }
}

export let filterSpeakerById = function(speakersJson,speakerId){

    let speakersList = [];
    speakersJson.forEach(speakerObj => speakersList.push(speakerObj));

    return speakersList.filter(speaker => speaker.speakerId===speakerId);
}