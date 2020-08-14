<template>
  <div id="quiz">
    <figure>
      <img src="../assets/quiz-img.svg" alt="" />
    </figure>
    <p id="question" v-if="correctAnswer">
      <template v-if="questionType === 'flag'">
        <img class="flag" v-bind:src="correctAnswer.flag" alt="" />
        Which country does this flag belong to?
      </template>
      <template v-else>
        {{ correctAnswer.capital }} is the capital of
      </template>
    </p>
    <ol id="answers">
      <li
        v-for="answer in answers"
        v-on:click="pickAnswer(answer)"
        v-bind:class="{
          correct: answer.correct && pickedAnswer,
          incorrect: !answer.correct && pickedAnswer === answer,
        }"
        :key="answer.alpha2Code"
      >
        {{ answer.name }}
      </li>
    </ol>
    <div id="controls">
      <button v-on:click="goToNextQuestion()">Next</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { random, shuffle, sample } from "underscore";
export default {
  name: "Quiz",
  data: () => ({
    answers: [],
    correctAnswer: null,
    pickedAnswer: null,
    shuffledCountries: null,
    questionTypes: ["capital", "flag"],
    questionType: null,
  }),
  computed: mapGetters(["allCountries"]),
  created() {
    this.shuffledCountries = shuffle(this.allCountries);
    this.drawAQuestion();
  },
  methods: {
    ...mapActions(["increaseScore", "endGame"]),
    pickAnswer: function(answer) {
      if (this.pickedAnswer) return false;
      this.pickedAnswer = answer;
    },
    rollQuestionType: function() {
      return this.questionTypes[random(0, 1)];
    },
    drawAQuestion: function() {
      this.questionType = this.rollQuestionType();
      this.pickedAnswer = false;

      this.correctAnswer = this.shuffledCountries.find(
        (country) => !country.asked
      );

      if (!this.correctAnswer) {
        this.endGame();
        return false;
      }

      this.correctAnswer.asked = true;

      const incorrectAnswers = sample(
        this.shuffledCountries.filter(
          (country) => country !== this.correctAnswer
        ),
        3
      );

      this.answers = shuffle([
        { ...this.correctAnswer, correct: true },
        ...incorrectAnswers,
      ]);
    },
    goToNextQuestion: function() {
      if (!this.pickedAnswer) return false;

      if (this.pickedAnswer.correct) {
        this.drawAQuestion();
        this.increaseScore();
      } else {
        this.endGame();
      }
    },
  },
};
</script>

<style lang="scss">
#quiz {
  figure {
    position: absolute;
    right: 0;
    top: -75px;
    margin: 0;
    img {
      display: block;
    }
  }
  p#question {
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    color: #2f527b;
    margin-top: 45px;
    margin-bottom: 32px;
    img.flag {
      display: block;
      height: 64px;
      box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      margin-bottom: 28px;
    }
  }
}
#answers {
  list-style-type: none;
  counter-reset: item;
  padding: 0;
  margin: 0;
  font-size: 18px;
  li {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 19px;
    background: #ffffff;
    border: 2px solid rgba(96, 102, 208, 0.7);
    height: 56px;
    border-radius: 12px;
    transition: all 0.2s;
    margin-bottom: 25px;
    cursor: pointer;
    color: rgba(96, 102, 208, 0.8);
    font-weight: 500;
    &:before {
      margin-right: 47px;
      content: counter(item, upper-latin);
      counter-increment: item;
    }
    &:hover,
    &.correct,
    &.incorrect {
      color: #fff;
    }
    &:hover {
      background: #f9a826;
      border-color: #f9a826;
    }
    &.correct {
      background: #60bf88;
      border-color: #60bf88;
    }
    &.incorrect {
      background: #ea8282;
      border-color: #ea8282;
    }
  }
}
#controls {
  display: flex;
  button {
    width: 116px;
    height: 56px;
    background: #f9a826;
    box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
    border-radius: 12px;
    border: 0;
    display: block;
    margin-left: auto;
    font-weight: bold;
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
