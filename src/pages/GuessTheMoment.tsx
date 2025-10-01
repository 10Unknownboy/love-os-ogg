
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, RotateCcw } from 'lucide-react';

const GuessTheMoment: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const loveQuestions = [
    {
      question: "How much we have texted in total?",
      options: ["600,000", "150,000", "650,000", "400,000"],
      correct: 2,
      emoji: "💬"
    },
    {
      question: "Which emoji we have used the most?",
      options: ["♥", "😭", "🫠", "🙂"],
      correct: 1,
      emoji: "😭"
    },
    {
      question: "Who uses more words per message?",
      options: ["xyz", "xyz", "Equal"],
      correct: 0,
      emoji: "📝"
    },
    {
      question: "Who has criticized more?",
      options: ["xyz", "xyz", "Equal"],
      correct: 2,
      emoji: "🤔"
    },
    {
      question: "Who has complimented more?",
      options: ["xyz", "xyz", "Equal"],
      correct: 1,
      emoji: "🥰"
    },
    {
      question: "Who has messaged more?",
      options: ["xyz", "xyz", "Equal"],
      correct: 0,
      emoji: "📱"
    },
    {
      question: "Most used word of xyz?",
      options: ["Hi", "Bye", "No", "shut up"],
      correct: 0,
      emoji: "🗣️"
    },
    {
      question: "Most used word of xyz?",
      options: ["YOO", "damnn", "sorry", "love you"],
      correct: 3,
      emoji: "💭"
    },
    {
      question: "Do we have same interest love?",
      options: ["Yes", "No"],
      correct: 1,
      emoji: "🎯"
    },
    {
      question: "Who is more supportive?",
      options: ["xyz", "xyz"],
      correct: 0,
      emoji: "🤝"
    },
    {
      question: "Advice for xyz in relationship that xyz wants to give?",
      options: ["continue being supportive", "more openness to feelings", "have more patience", "I like him as he is!!"],
      correct: 3,
      emoji: "💝"
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === loveQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < loveQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(false);
    setGameComplete(false);
    setSelectedAnswer(null);
  };

  if (gameComplete) {
    const percentage = Math.round((score / loveQuestions.length) * 100);
    
    return (
      <div className="min-h-screen bg-love-gradient p-8">
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 text-center animate-fade-in-up">
            <div className="text-6xl mb-6 animate-pulse-heart">
              {percentage === 100 ? "🏆" : percentage >= 80 ? "🎉" : percentage >= 60 ? "😊" : "💕"}
            </div>
            <h2 className="text-3xl font-bold text-love-600 mb-4">
              Love Quiz Complete!
            </h2>
            <p className="text-2xl text-love-500 mb-2">
              Score: {score}/{loveQuestions.length}
            </p>
            <p className="text-xl text-love-400 mb-6">
              {percentage}% Love Knowledge
            </p>
            <div className="w-full bg-love-100 rounded-full h-4 mb-6">
              <div 
                className="bg-gradient-to-r from-love-400 to-love-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-love-600 mb-8">
              {percentage === 100 
                ? "Perfect! You know each other so well 💕" 
                : percentage >= 80 
                ? "Amazing! Your love bond is strong 💖"
                : percentage >= 60
                ? "Good! Keep learning about each other 💗"
                : "There's still so much to discover together 💝"}
            </p>
            <div className="space-y-4">
              <button
                onClick={resetGame}
                className="bg-love-500 hover:bg-love-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 mr-4 flex items-center gap-2 mx-auto"
              >
                <RotateCcw size={20} />
                Play Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="glass-effect px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Back to Love OS
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const current = loveQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-love-gradient p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="glass-effect p-3 rounded-full hover:scale-110 transition-all duration-300"
          >
            ← Back to Love OS
          </button>
          <h1 className="text-3xl font-bold text-love-700 text-center flex items-center gap-2">
            <Heart className="text-love-500" size={32} />
            Love Quiz
            <Heart className="text-love-500" size={32} />
          </h1>
          <div></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-love-600 font-semibold">
              Question {currentQuestion + 1} of {loveQuestions.length}
            </span>
            <span className="text-love-500">
              Score: {score}/{currentQuestion + (showAnswer ? 1 : 0)}
            </span>
          </div>
          <div className="w-full bg-love-100 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-love-400 to-love-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion) / loveQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-effect rounded-3xl p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-pulse">
              {current.emoji}
            </div>
            <h3 className="text-2xl font-bold text-love-600 mb-2">
              Love Question {currentQuestion + 1}
            </h3>
            <p className="text-xl text-love-700">
              {current.question}
            </p>
          </div>

          {!showAnswer ? (
            <div className="grid grid-cols-1 gap-4">
              {current.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="bg-white/30 hover:bg-white/50 p-4 rounded-xl text-love-700 font-semibold transition-all duration-300 hover:scale-105 text-left flex items-center"
                >
                  <span className="w-8 h-8 bg-love-200 rounded-full flex items-center justify-center mr-4 font-bold text-love-600">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">
                {selectedAnswer === current.correct ? "🎉" : "💔"}
              </div>
              <p className="text-xl text-love-600 mb-4">
                {selectedAnswer === current.correct ? "Correct! 💕" : "Oops! Better luck next time 💗"}
              </p>
              <p className="text-lg text-love-500 mb-6">
                The correct answer was: <span className="font-bold">{current.options[current.correct]}</span>
              </p>
              <button
                onClick={nextQuestion}
                className="bg-love-500 hover:bg-love-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                {currentQuestion < loveQuestions.length - 1 ? "Next Question 💕" : "See Results 🏆"}
              </button>
            </div>
          )}
        </div>

        {/* Fun Stats */}
        <div className="mt-8 text-center">
          <div className="glass-effect rounded-2xl p-6 inline-block">
            <h4 className="text-love-600 font-bold mb-2">Quiz Progress</h4>
            <div className="flex items-center gap-4">
              <div className="text-green-500">✓ {score} Correct</div>
              <div className="text-red-400">✗ {(showAnswer ? currentQuestion + 1 : currentQuestion) - score} Wrong</div>
              <div className="text-love-400">📝 {loveQuestions.length - (currentQuestion + (showAnswer ? 1 : 0))} Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuessTheMoment;
