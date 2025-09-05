// Word synonyms
const createElement = (arr) => {
  const htmlElements = arr.map((elmnt) => `<span class="btn">${elmnt}</span>`);
  console.log(htmlElements);
  return htmlElements.join(" ");
};

// Spinner add
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

const allLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

// Remove Active btn
const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};

// lodeLevelWord
const lodeLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive(); // remove all active btn
      const clickBtn = document.getElementById(`btn-lesson-${id}`);
      clickBtn.classList.add("active");

      displayLevelWord(json.data);
    });
};

// showWordDetails
const showWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayDetail(details.data);
};
const displayDetail = (word) => {
  console.log(word);
  const detailBox = document.getElementById("detail-box");
  detailBox.innerHTML = `
   <div class="p-8 border border-sky-50 rounded-lg">
                <h3 class="font-poppins text-2xl font-bold">${
                  word.word
                } (<i class="fa-solid fa-microphone-lines"></i>:${
    word.pronunciation
  })</h3>
              <div class="py-5">
              <p class=" font-poppins font-bold">
                Meaning 
              </p>
              <p class="font-bangla font-semibold">${
                word.meaning ? word.meaning : "শব্দ পাওয়া যাইনি"
              }</p>
              </div>
              <div class=" py-4">
                <p class="font-poppins font-bold">Example</p>
                <p class="text-[#00000080]">${word.sentence}</p>
              </div>
              <div class="">
                <p class="font-bangla font-semibold">সমার্থক শব্দ গুলো</p>
                <div class="">${createElement(word.synonyms)}</div>
              </div>
              </div>
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn bg-[#422ad5] text-white">Complete Learning</button>
                </form>
              </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  // IF condition
  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class="col-span-full mx-auto p-10 space-y-5 text-center">
        <img class="mx-auto" src="./assets/alert-error.png"/>
            <p class=" text[#18181b] opacity-70">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-3xl font-semibold">নেক্সট Lesson এ যান</h1>
          </div>
        `;
  }
  // for loop => forEach
  words.forEach((word) => {
    const createCard = document.createElement("div");
    createCard.innerHTML = `
    <div class="mx-auto my-8 p-4 bg-white rounded-lg w-[90%]">
              <div class="text-center space-y-4 mb-">
                <h1 class="text-2xl font-bold font-poppins">${word.word}</h1>
                <p class="font-poppins font-semibold">Meaning /Pronounciation</p>
                <h1 class="font-bangla text-xl font-bold text[#18181b] opacity-70">"${
                  word.meaning ? word.meaning : "শব্দ পাওয়া যাইনি"
                }/${word.pronunciation}"</h1>
              </div>
              <div class="flex justify-between pt-8">
                <button onclick="showWordDetails(${
                  word.id
                })" class="p-2 bg-[#1a91ff1a] rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
                <button class="p-2 bg-[#1a91ff1a] rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
              </div>
            </div>
    `;
    wordContainer.append(createCard);
  });
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  const lessonBtn = document.getElementById("level-container");
  lessonBtn.innerHTML = "";

  for (let lesson of lessons) {
    // Create
    const btnLesson = document.createElement("div");
    btnLesson.innerHTML = `
        <button id="btn-lesson-${lesson.level_no}" onclick = "lodeLevelWord(${lesson.level_no})" class="flex mx-auto btn btn-outline btn-primary font-bold lesson-btn">
              <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
            </button>
        `;
    lessonBtn.appendChild(btnLesson);
  }
  
};
allLesson();
