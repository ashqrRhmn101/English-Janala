const allLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
// lodeLevelWord
const lodeLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevelWord(json.data));
};
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
  // for loop => forEach
  words.forEach((word) => {
    const createCard = document.createElement("div");
    createCard.innerHTML = `
    <div class="m-8 p-4 bg-white rounded-lg">
              <div class="text-center space-y-4 mb-8">
                <h1 class="text-2xl font-bold font-poppins">${word.word}</h1>
                <p class="font-poppins font-semibold">Meaning /Pronounciation</p>
                <h1 class="font-bangla text-2xl font-bold text[#18181b] opacity-70">"${word.meaning}/${word.pronunciation}"</h1>
              </div>
              <div class="flex justify-between">
                <button class="p-2 bg-[#1a91ff1a] rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button class="p-2 bg-[#1a91ff1a] rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
              </div>
            </div>
    `;
    wordContainer.append(createCard);
  });
};

const displayLesson = (lessons) => {
  const lessonBtn = document.getElementById("level-container");
  lessonBtn.innerHTML = "";

  for (let lesson of lessons) {
    // Create
    const btnLesson = document.createElement("div");
    btnLesson.innerHTML = `
        <button onclick = "lodeLevelWord(${lesson.level_no})" class="flex mx-auto btn btn-outline btn-primary font-bold">
              <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
            </button>
        `;
    lessonBtn.appendChild(btnLesson);
  }
  // console.log(levelNo);
};
allLesson();
