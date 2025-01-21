"use client";
import React, { useState } from "react";
import {
  Home,
  Award,
  BookOpen,
  User,
  ChevronLeft,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Star,
  Coffee,
  Users,
  Bell,
  Calendar,
  Package,
  Phone,
  CreditCard,
  Dices,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
// 홈 화면
const HomeScreen = ({ onNavigate }) => {
  const [userName] = useState("김영수");
  const [level] = useState(3);
  const [experience] = useState(380);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          안녕하세요,
          <br />
          {userName}님
        </h1>
        <div className="text-2xl bg-blue-100 p-4 rounded-xl">
          <div>현재 레벨</div>
          <div className="text-3xl text-blue-600 font-bold text-center">
            {level}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card
          className="cursor-pointer hover:shadow-lg"
          onClick={() => onNavigate("quiz")}
        >
          <CardContent className="p-6">
            <BookOpen className="w-12 h-12 mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold">퀴즈 풀기</h2>
            <p className="text-lg text-gray-600">새로운 퀴즈가 있습니다</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-lg"
          onClick={() => onNavigate("level")}
        >
          <CardContent className="p-6">
            <Award className="w-12 h-12 mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold">나의 레벨</h2>
            <p className="text-lg text-gray-600">{experience} / 450 점</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:shadow-lg"
          onClick={() => onNavigate("badges")}
        >
          <CardContent className="p-6">
            <Shield className="w-12 h-12 mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold">나의 뱃지</h2>
            <p className="text-lg text-gray-600">5개 획득</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg">
          <CardContent className="p-6">
            <AlertTriangle className="w-12 h-12 mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold">신고하기</h2>
            <p className="text-lg text-gray-600">피싱 신고 방법</p>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-yellow-50 border-yellow-200">
        <AlertDescription className="text-lg">
          <div className="font-bold">오늘의 팁</div>
          <div>은행은 절대로 문자나 전화로 개인정보를 요구하지 않습니다.</div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
//윷놀이 게임 로기
const YutNoriGame = ({ onBack, quizDatabase }) => {
  const [playerPositions, setPlayerPositions] = useState([0]);
  const [computerPositions, setComputerPositions] = useState([0]);
  const [currentTurn, setCurrentTurn] = useState('player'); // 'player' or 'computer'
  const [rolling, setRolling] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [yutResult, setYutResult] = useState(null);
  const [gameMessage, setGameMessage] = useState('윷을 던져주세요!');

  // 윷놀이 판의 경로 정의
  const boardPositions = [
    { x: 200, y: 350 }, // 시작점
    { x: 200, y: 280 },
    { x: 200, y: 210 },
    { x: 200, y: 140 },
    { x: 200, y: 70 },  // 위쪽 코너
    { x: 270, y: 70 },
    { x: 340, y: 70 },
    { x: 340, y: 140 },
    { x: 340, y: 210 },
    { x: 340, y: 280 }, // 오른쪽 코너
    { x: 340, y: 350 },
    { x: 270, y: 350 },
    // 대각선 경로
    { x: 270, y: 210 }, // 중앙
  ];

  const yutResults = {
    1: '도',
    2: '개',
    3: '걸',
    4: '윷',
    5: '모'
  };

  const rollYut = () => {
    if (currentTurn !== 'player' || rolling) return;
    
    setRolling(true);
    setGameMessage('윷을 던지는 중...');

    setTimeout(() => {
      const move = Math.floor(Math.random() * 5) + 1;
      const resultName = yutResults[move];
      setYutResult(resultName);
      setGameMessage(`${resultName}이(가) 나왔습니다!`);

      // 플레이어 말 이동
      setPlayerPositions(prev => {
        const newPositions = [...prev];
        const currentPos = newPositions[0];
        const nextPos = (currentPos + move) % boardPositions.length;
        
        // 컴퓨터 말을 잡았는지 확인
        if (computerPositions.includes(nextPos)) {
          setGameMessage(prev => prev + ' 상대 말을 잡았습니다!');
          setComputerPositions([0]);
        }

        newPositions[0] = nextPos;
        return newPositions;
      });

      // 퀴즈 설정
      const categories = Object.keys(quizDatabase);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const categoryQuizzes = quizDatabase[randomCategory];
      const randomQuiz = categoryQuizzes[Math.floor(Math.random() * categoryQuizzes.length)];
      setQuiz(randomQuiz);

      setRolling(false);

      // 윷이나 모가 아니면 컴퓨터 턴으로 전환
      if (move < 4) {
        setTimeout(() => {
          setCurrentTurn('computer');
          setGameMessage('컴퓨터 턴입니다...');
          computerTurn();
        }, 1500);
      }
    }, 1500);
  };

  const computerTurn = () => {
    setTimeout(() => {
      const move = Math.floor(Math.random() * 5) + 1;
      const resultName = yutResults[move];
      setGameMessage(`컴퓨터: ${resultName}이(가) 나왔습니다!`);

      setComputerPositions(prev => {
        const newPositions = [...prev];
        const currentPos = newPositions[0];
        const nextPos = (currentPos + move) % boardPositions.length;
        
        // 플레이어 말을 잡았는지 확인
        if (playerPositions.includes(nextPos)) {
          setGameMessage(prev => prev + ' 여러분의 말을 잡았습니다!');
          setPlayerPositions([0]);
        }

        newPositions[0] = nextPos;
        return newPositions;
      });

      // 윷이나 모가 아니면 플레이어 턴으로 전환
      if (move < 4) {
        setCurrentTurn('player');
        setGameMessage('당신의 턴입니다!');
      } else {
        setTimeout(computerTurn, 1500);
      }
    }, 1500);
  };

  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) {
      setGameMessage('정답입니다! 계속 진행하세요.');
      if (yutResult === '윷' || yutResult === '모') {
        setGameMessage('한 번 더 던지세요!');
      }
    } else {
      setGameMessage('틀렸습니다. 말을 처음 위치로 되돌립니다.');
      setPlayerPositions([0]);
      setCurrentTurn('computer');
      setTimeout(computerTurn, 1500);
    }
    setQuiz(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-8">
        <ChevronLeft className="w-8 h-8 cursor-pointer" onClick={onBack} />
        <h1 className="text-3xl font-bold ml-4">피싱 윷놀이</h1>
      </div>

      {/* 게임 상태 메시지 */}
      <div className="text-xl font-bold text-center mb-6">
        {gameMessage}
      </div>

      {/* 윷놀이 판 */}
      <div className="relative w-full h-[400px] bg-yellow-50 rounded-xl border-2 border-yellow-200 mb-6">
        {/* 경로 표시 */}
        <svg className="absolute inset-0">
          {boardPositions.map((pos, index) => (
            <circle
              key={`pos-${index}`}
              cx={pos.x}
              cy={pos.y}
              r="5"
              fill="#666"
            />
          ))}
          {/* 경로 선 */}
          {boardPositions.map((pos, index) => {
            if (index < boardPositions.length - 1) {
              return (
                <line
                  key={`line-${index}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2={boardPositions[index + 1].x}
                  y2={boardPositions[index + 1].y}
                  stroke="#666"
                  strokeWidth="2"
                />
              );
            }
            return null;
          })}
        </svg>

        {/* 플레이어 말 */}
        {playerPositions.map((pos, index) => {
          const position = boardPositions[pos];
          return (
            <div
              key={`player-${index}`}
              className="absolute w-6 h-6 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
              style={{
                left: position.x,
                top: position.y,
              }}
            />
          );
        })}

        {/* 컴퓨터 말 */}
        {computerPositions.map((pos, index) => {
          const position = boardPositions[pos];
          return (
            <div
              key={`computer-${index}`}
              className="absolute w-6 h-6 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
              style={{
                left: position.x,
                top: position.y,
              }}
            />
          );
        })}
      </div>

      {/* 윷 던지기 버튼 */}
      <button
        className={`w-full py-4 rounded-xl text-xl font-bold mb-6 
          ${currentTurn === 'player' && !rolling && !quiz
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        onClick={rollYut}
        disabled={currentTurn !== 'player' || rolling || quiz}
      >
        {rolling ? '윷을 던지는 중...' : '윷 던지기'}
      </button>

      {/* 퀴즈 */}
      {quiz && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
            <div className="space-y-4">
              {quiz.options.map((option, index) => (
                <button
                  key={index}
                  className="w-full p-4 text-left border rounded-lg hover:border-blue-500"
                  onClick={() => handleQuizAnswer(option.isCorrect)}
                >
                  {option.content}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
// 레벨 화면
const LevelScreen = ({ onBack }) => {
  const levels = [
    { level: 1, name: "새내기", exp: 100, completed: true },
    { level: 2, name: "수습생", exp: 250, completed: true },
    { level: 3, name: "주니어", exp: 450, completed: false },
    { level: 4, name: "시니어", exp: 700, completed: false },
    { level: 5, name: "마스터", exp: 1000, completed: false },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-8">
        <ChevronLeft className="w-8 h-8 cursor-pointer" onClick={onBack} />
        <h1 className="text-3xl font-bold ml-4">나의 레벨</h1>
      </div>

      <div className="space-y-6">
        {levels.map((level) => (
          <Card
            key={level.level}
            className={level.completed ? "border-blue-500" : "opacity-70"}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">레벨 {level.level}</div>
                  <div className="text-xl text-gray-600">{level.name}</div>
                </div>
                <div className="text-xl">{level.exp}점</div>
              </div>
              {level.completed && (
                <div className="mt-4 text-blue-600 text-lg">완료!</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// 퀴즈 화면
// 퀴즈 화면

const QuizScreen = ({ onBack, quizDatabase }) => {
  const [currentCategory, setCurrentCategory] = useState("택배사칭");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuiz = quizDatabase[currentCategory][questionIndex];
  const totalQuestions = Object.values(quizDatabase).reduce(
    (acc, curr) => acc + curr.length,
    0
  );
  const currentQuestionNumber = questionIndex + 1;

  const handleSelect = (index) => {
    if (!showResult) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      if (currentQuiz.options[selectedOption].isCorrect) {
        setScore(score + 100);
      }
      setShowResult(true);
    }
  };

  const handleNext = () => {
    if (questionIndex < quizDatabase[currentCategory].length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // 모든 문제를 다 풀었을 때
      const categories = Object.keys(quizDatabase);
      const currentCategoryIndex = categories.indexOf(currentCategory);

      if (currentCategoryIndex < categories.length - 1) {
        // 다음 카테고리로 이동
        setCurrentCategory(categories[currentCategoryIndex + 1]);
        setQuestionIndex(0);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        // 모든 카테고리 완료
        onBack();
      }
    }
  };

  return (
    <div className="p-6 pb-24">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <ChevronLeft className="w-8 h-8 cursor-pointer" onClick={onBack} />
          <h1 className="text-3xl font-bold ml-4">피싱 퀴즈</h1>
        </div>
        <div className="text-2xl font-bold text-blue-600">{score}점</div>
      </div>

      {/* 진행 상황 */}
      <div className="bg-blue-100 text-blue-800 p-4 rounded-xl mb-6">
        <div className="text-lg font-bold mb-2">{currentCategory}</div>
        <div className="text-sm">{currentQuestionNumber}번 문제</div>
      </div>

      {/* 퀴즈 내용 */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="text-2xl font-bold mb-6">{currentQuiz.title}</div>

          {/* 선택지 */}
          <div className="space-y-4">
            {currentQuiz.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(index)}
                className={`p-6 rounded-xl cursor-pointer border-2 transition-all
                  ${
                    showResult
                      ? option.isCorrect
                        ? "bg-green-50 border-green-500"
                        : selectedOption === index
                        ? "bg-red-50 border-red-500"
                        : "border-gray-200"
                      : selectedOption === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
              >
                {/* 메시지 내용 */}
                <div className="text-xl whitespace-pre-line">
                  {option.content}
                </div>

                {/* 정답 설명 */}
                {showResult &&
                  (selectedOption === index || option.isCorrect) && (
                    <div
                      className={`mt-4 p-4 rounded-lg ${
                        option.isCorrect ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        {option.isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600 mr-2" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600 mr-2" />
                        )}
                        <span className="font-bold">
                          {option.isCorrect ? "정답입니다!" : "틀렸습니다!"}
                        </span>
                      </div>
                      <div className="text-lg">{option.explanation}</div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 힌트 & 버튼 */}
      {!showResult ? (
        <>
          <Alert className="mb-6">
            <AlertTriangle className="w-6 h-6" />
            <AlertDescription className="text-lg ml-2">
              💡 힌트: {currentQuiz.hint}
            </AlertDescription>
          </Alert>
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`w-full bg-blue-600 text-white text-xl py-4 rounded-xl
              ${
                selectedOption === null
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }
            `}
          >
            정답 확인하기
          </button>
        </>
      ) : (
        <button
          onClick={handleNext}
          className="w-full bg-green-600 text-white text-xl py-4 rounded-xl hover:bg-green-700"
        >
          다음 문제
        </button>
      )}
    </div>
  );
};

// 뱃지 화면
const BadgesScreen = ({ onBack }) => {
  const badges = [
    {
      id: 1,
      name: "첫 퀴즈",
      icon: <BookOpen className="w-12 h-12" />,
      acquired: true,
    },
    {
      id: 2,
      name: "안전왕",
      icon: <Shield className="w-12 h-12" />,
      acquired: true,
    },
    {
      id: 3,
      name: "택배 전문가",
      icon: <Package className="w-12 h-12" />,
      acquired: true,
    },
    {
      id: 4,
      name: "통화 달인",
      icon: <Phone className="w-12 h-12" />,
      acquired: false,
    },
    {
      id: 5,
      name: "카드 보안",
      icon: <CreditCard className="w-12 h-12" />,
      acquired: false,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-8">
        <ChevronLeft className="w-8 h-8 cursor-pointer" onClick={onBack} />
        <h1 className="text-3xl font-bold ml-4">나의 뱃지</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {badges.map((badge) => (
          <Card key={badge.id} className={!badge.acquired ? "opacity-50" : ""}>
            <CardContent className="p-6 flex flex-col items-center">
              <div className="mb-4 text-blue-600">{badge.icon}</div>
              <div className="text-xl font-bold text-center">{badge.name}</div>
              {badge.acquired && (
                <div className="mt-2 text-blue-600">획득!</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
  const quizDatabase = {
    택배사칭: [
      {
        title: "다음 중 택배 사칭 문자일까요?",
        options: [
          {
            content:
              "[우체국택배] 등기소포가 금일 배송 예정입니다.\n조회하기 ▶ http://mail-service.kr/deliver",
            isCorrect: true,
            explanation:
              '가짜입니다! 우체국택배는 "epost.kr" 주소만 사용합니다. 수상한 링크를 조심하세요.',
          },
          {
            content:
              "[우체국택배] 고객님의 등기우편물이 배달완료 되었습니다.\n등기번호:12345678",
            isCorrect: false,
            explanation:
              "진짜입니다! 클릭할 링크가 없고 등기번호만 안내하는 것이 특징입니다.",
          },
        ],
        hint: "우체국 공식 웹사이트 주소를 확인해보세요.",
      },
      {
        title: "다음 중 가짜 택배문자를 골라주세요!",
        options: [
          {
            content:
              "[롯데택배] 주소지 불명으로 반송됩니다.\n수령지 정보 수정 ▶ http://lotte-delivery.co.kr",
            isCorrect: true,
            explanation:
              '가짜입니다! 진짜 롯데택배는 "lotteglobis.com"을 사용합니다. 또한 수령지 수정을 문자로 요구하지 않습니다.',
          },
          {
            content:
              "[롯데택배] 고객님의 상품이 오늘 배송완료 되었습니다.\n운송장번호:23456789",
            isCorrect: false,
            explanation:
              "진짜입니다! 단순히 배송 완료를 알리고 운송장번호만 표시합니다.",
          },
        ],
        hint: "긴급하게 클릭을 요구하는 문자는 의심해보세요.",
      },
    ],

    금융사기: [
      {
        title: "어떤 것이 은행 사칭 문자일까요?",
        options: [
          {
            content:
              "[KB국민] 고객님의 계좌에서 3,570,000원이 이체되었습니다.\n확인하기 ▶ http://kbstar-bank.co.kr",
            isCorrect: true,
            explanation:
              '가짜입니다! KB국민은행은 "kbstar.com"만 사용합니다. 큰 금액 이체를 알리며 링크를 보내는 것은 피싱 수법입니다.',
          },
          {
            content:
              "[KB국민] 고객님의 신용카드가 발급되었습니다. 영업점에 방문하여 수령해주세요.",
            isCorrect: false,
            explanation:
              "진짜입니다! 카드 발급 시에는 반드시 영업점 방문 수령을 안내합니다.",
          },
        ],
        hint: "은행은 절대로 문자로 인증이나 확인 링크를 보내지 않습니다.",
      },
      {
        title: "다음 중 보이스피싱이 의심되는 전화는?",
        options: [
          {
            content:
              '"금감원 김철수입니다. 고객님 계좌가 해킹되어 안전계좌로 이체가 필요합니다."',
            isCorrect: true,
            explanation:
              "가짜입니다! 금감원은 절대로 계좌 이체를 요구하지 않습니다. 전화로 계좌 이체를 요구하면 100% 보이스피싱입니다.",
          },
          {
            content:
              '"KB국민은행입니다. 고객님 신청하신 카드 수령을 위해 영업점에 방문해주세요."',
            isCorrect: false,
            explanation:
              "진짜입니다! 은행은 전화로 영업점 방문만 안내하고, 절대 계좌 정보나 이체를 요구하지 않습니다.",
          },
        ],
        hint: "정부기관이나 은행은 절대 전화로 이체를 요구하지 않습니다.",
      },
    ],

    대출사기: [
      {
        title: "다음 중 대출 사기 문자는?",
        options: [
          {
            content:
              "[대출안내] 신용등급 관계없이 최대 5천만원!\n당일 승인, 당일 지급\n상담: http://loan-money.kr",
            isCorrect: true,
            explanation:
              "가짜입니다! 신용등급 무관, 당일 지급 등의 조건은 대부분 사기입니다. 불법 대출업자 주의하세요.",
          },
          {
            content:
              "[NH농협] 고객님의 대출 심사가 완료되었습니다. 자세한 사항은 영업점에 방문하여 확인해주세요.",
            isCorrect: false,
            explanation:
              "진짜입니다! 정상적인 은행 대출은 반드시 영업점 방문을 통해 진행됩니다.",
          },
        ],
        hint: "너무 좋은 대출 조건은 의심해 보세요.",
      },
      {
        title: "정부지원 대출을 사칭하는 문자는?",
        options: [
          {
            content:
              "[코로나 대출] 소상공인 지원대출 최대 3천만원!\n상담하기 ▶ http://gov-support.kr",
            isCorrect: true,
            explanation:
              "가짜입니다! 정부나 공공기관은 절대로 문자나 전화로 대출을 안내하지 않습니다.",
          },
          {
            content:
              "[중소기업진흥공단] 대출 상담은 전국 지역본부 또는 홈페이지(www.kosmes.or.kr)를 이용해주세요.",
            isCorrect: false,
            explanation:
              "진짜입니다! 공식 홈페이지나 지역본부 방문을 안내하는 것이 정상입니다.",
          },
        ],
        hint: "정부기관은 정해진 절차와 공식 창구만 이용합니다.",
      },
    ],

    정상문자: [
      {
        title: "다음 중 정상적인 문자는 무엇일까요?",
        options: [
          {
            content:
              "[NH농협] 체크카드가 발급되었습니다. 영업점에 방문하여 수령해주세요.",
            isCorrect: true,
            explanation:
              "진짜입니다! 카드는 항상 영업점 방문 수령이 원칙입니다. 링크나 인증을 요구하지 않습니다.",
          },
          {
            content:
              "[농협카드] 체크카드 발급완료. 수령을 위해 아래 링크에서 본인확인 필요\nhttp://nh-card.kr",
            isCorrect: false,
            explanation:
              "가짜입니다! 은행은 절대로 문자로 링크를 보내거나 인증을 요구하지 않습니다.",
          },
        ],
        hint: "정상적인 문자는 단순 안내만 하고 링크를 포함하지 않습니다.",
      },
    ],
  };

// 메인 앱 컴포넌트
const PhishingEducationApp = () => {
  const [currentScreen, setCurrentScreen] = useState("home");

  const quizDatabase = {
    택배사칭: [
      {
        title: "다음 중 택배 사칭 문자일까요?",
        options: [
          {
            content:
              "[우체국택배] 등기소포가 금일 배송 예정입니다.\n조회하기 ▶ http://mail-service.kr/deliver",
            isCorrect: true,
            explanation:
              '가짜입니다! 우체국택배는 "epost.kr" 주소만 사용합니다. 수상한 링크를 조심하세요.',
          },
          {
            content:
              "[우체국택배] 고객님의 등기우편물이 배달완료 되었습니다.\n등기번호:12345678",
            isCorrect: false,
            explanation:
              "진짜입니다! 클릭할 링크가 없고 등기번호만 안내하는 것이 특징입니다.",
          },
        ],
        hint: "우체국 공식 웹사이트 주소를 확인해보세요.",
      },
      {
        title: "다음 중 가짜 택배문자를 골라주세요!",
        options: [
          {
            content:
              "[롯데택배] 주소지 불명으로 반송됩니다.\n수령지 정보 수정 ▶ http://lotte-delivery.co.kr",
            isCorrect: true,
            explanation:
              '가짜입니다! 진짜 롯데택배는 "lotteglobis.com"을 사용합니다. 또한 수령지 수정을 문자로 요구하지 않습니다.',
          },
          {
            content:
              "[롯데택배] 고객님의 상품이 오늘 배송완료 되었습니다.\n운송장번호:23456789",
            isCorrect: false,
            explanation:
              "진짜입니다! 단순히 배송 완료를 알리고 운송장번호만 표시합니다.",
          },
        ],
        hint: "긴급하게 클릭을 요구하는 문자는 의심해보세요.",
      },
    ],

    금융사기: [
      {
        title: "어떤 것이 은행 사칭 문자일까요?",
        options: [
          {
            content:
              "[KB국민] 고객님의 계좌에서 3,570,000원이 이체되었습니다.\n확인하기 ▶ http://kbstar-bank.co.kr",
            isCorrect: true,
            explanation:
              '가짜입니다! KB국민은행은 "kbstar.com"만 사용합니다. 큰 금액 이체를 알리며 링크를 보내는 것은 피싱 수법입니다.',
          },
          {
            content:
              "[KB국민] 고객님의 신용카드가 발급되었습니다. 영업점에 방문하여 수령해주세요.",
            isCorrect: false,
            explanation:
              "진짜입니다! 카드 발급 시에는 반드시 영업점 방문 수령을 안내합니다.",
          },
        ],
        hint: "은행은 절대로 문자로 인증이나 확인 링크를 보내지 않습니다.",
      },
      {
        title: "다음 중 보이스피싱이 의심되는 전화는?",
        options: [
          {
            content:
              '"금감원 김철수입니다. 고객님 계좌가 해킹되어 안전계좌로 이체가 필요합니다."',
            isCorrect: true,
            explanation:
              "가짜입니다! 금감원은 절대로 계좌 이체를 요구하지 않습니다. 전화로 계좌 이체를 요구하면 100% 보이스피싱입니다.",
          },
          {
            content:
              '"KB국민은행입니다. 고객님 신청하신 카드 수령을 위해 영업점에 방문해주세요."',
            isCorrect: false,
            explanation:
              "진짜입니다! 은행은 전화로 영업점 방문만 안내하고, 절대 계좌 정보나 이체를 요구하지 않습니다.",
          },
        ],
        hint: "정부기관이나 은행은 절대 전화로 이체를 요구하지 않습니다.",
      },
    ],

    대출사기: [
      {
        title: "다음 중 대출 사기 문자는?",
        options: [
          {
            content:
              "[대출안내] 신용등급 관계없이 최대 5천만원!\n당일 승인, 당일 지급\n상담: http://loan-money.kr",
            isCorrect: true,
            explanation:
              "가짜입니다! 신용등급 무관, 당일 지급 등의 조건은 대부분 사기입니다. 불법 대출업자 주의하세요.",
          },
          {
            content:
              "[NH농협] 고객님의 대출 심사가 완료되었습니다. 자세한 사항은 영업점에 방문하여 확인해주세요.",
            isCorrect: false,
            explanation:
              "진짜입니다! 정상적인 은행 대출은 반드시 영업점 방문을 통해 진행됩니다.",
          },
        ],
        hint: "너무 좋은 대출 조건은 의심해 보세요.",
      },
      {
        title: "정부지원 대출을 사칭하는 문자는?",
        options: [
          {
            content:
              "[코로나 대출] 소상공인 지원대출 최대 3천만원!\n상담하기 ▶ http://gov-support.kr",
            isCorrect: true,
            explanation:
              "가짜입니다! 정부나 공공기관은 절대로 문자나 전화로 대출을 안내하지 않습니다.",
          },
          {
            content:
              "[중소기업진흥공단] 대출 상담은 전국 지역본부 또는 홈페이지(www.kosmes.or.kr)를 이용해주세요.",
            isCorrect: false,
            explanation:
              "진짜입니다! 공식 홈페이지나 지역본부 방문을 안내하는 것이 정상입니다.",
          },
        ],
        hint: "정부기관은 정해진 절차와 공식 창구만 이용합니다.",
      },
    ],

    정상문자: [
      {
        title: "다음 중 정상적인 문자는 무엇일까요?",
        options: [
          {
            content:
              "[NH농협] 체크카드가 발급되었습니다. 영업점에 방문하여 수령해주세요.",
            isCorrect: true,
            explanation:
              "진짜입니다! 카드는 항상 영업점 방문 수령이 원칙입니다. 링크나 인증을 요구하지 않습니다.",
          },
          {
            content:
              "[농협카드] 체크카드 발급완료. 수령을 위해 아래 링크에서 본인확인 필요\nhttp://nh-card.kr",
            isCorrect: false,
            explanation:
              "가짜입니다! 은행은 절대로 문자로 링크를 보내거나 인증을 요구하지 않습니다.",
          },
        ],
        hint: "정상적인 문자는 단순 안내만 하고 링크를 포함하지 않습니다.",
      },
    ],
  };
  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen("home");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;
      case "level":
        return <LevelScreen onBack={handleBack} />;
      case "quiz":
        return <QuizScreen onBack={handleBack} quizDatabase={quizDatabase} />; // quizDatabase 전달
      case "badges":
        return <BadgesScreen onBack={handleBack} />;
      case "yut":
        return <YutNoriGame onBack={handleBack} quizDatabase={quizDatabase} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}

      {/* 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around p-4">
          <div
            className={`flex flex-col items-center cursor-pointer ${
              currentScreen === "home" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => handleNavigate("home")}
          >
            <Home className="w-8 h-8" />
            <span className="text-lg">홈</span>
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer ${
              currentScreen === "quiz" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => handleNavigate("quiz")}
          >
            <BookOpen className="w-8 h-8" />
            <span className="text-lg">퀴즈</span>
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer ${
              currentScreen === "yut" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => handleNavigate("yut")}
          >
            <Dices className="w-8 h-8" />
            <span className="text-lg">윷놀이</span>
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer ${
              currentScreen === "badges" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => handleNavigate("badges")}
          >
            <Award className="w-8 h-8" />
            <span className="text-lg">뱃지</span>
          </div>
          <div
            className={`flex flex-col items-center cursor-pointer ${
              currentScreen === "level" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => handleNavigate("level")}
          >
            <User className="w-8 h-8" />
            <span className="text-lg">레벨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingEducationApp;
