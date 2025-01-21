'use client';
import React, { useState } from 'react';
import { Home, Award, BookOpen, User, ChevronLeft, Shield, AlertTriangle, Package, Phone, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// 홈 화면
const HomeScreen = ({ onNavigate }) => {
  const [userName] = useState('김영수');
  const [level] = useState(3);
  const [experience] = useState(380);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">안녕하세요,<br/>{userName}님</h1>
        <div className="text-2xl bg-blue-100 p-4 rounded-xl">
          <div>현재 레벨</div>
          <div className="text-3xl text-blue-600 font-bold text-center">{level}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => onNavigate('quiz')}>
          <CardContent className="p-6">
            <BookOpen className="w-12 h-12 mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold">퀴즈 풀기</h2>
            <p className="text-lg text-gray-600">새로운 퀴즈가 있습니다</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => onNavigate('level')}>
          <CardContent className="p-6">
            <Award className="w-12 h-12 mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold">나의 레벨</h2>
            <p className="text-lg text-gray-600">{experience} / 450 점</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg" onClick={() => onNavigate('badges')}>
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

// 레벨 화면
const LevelScreen = ({ onBack }) => {
  const levels = [
    { level: 1, name: '새내기', exp: 100, completed: true },
    { level: 2, name: '수습생', exp: 250, completed: true },
    { level: 3, name: '주니어', exp: 450, completed: false },
    { level: 4, name: '시니어', exp: 700, completed: false },
    { level: 5, name: '마스터', exp: 1000, completed: false },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-8">
        <ChevronLeft className="w-8 h-8 cursor-pointer" onClick={onBack} />
        <h1 className="text-3xl font-bold ml-4">나의 레벨</h1>
      </div>

      <div className="space-y-6">
        {levels.map((level) => (
          <Card key={level.level} className={level.completed ? 'border-blue-500' : 'opacity-70'}>
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
const QuizScreen = ({ onBack }) => {
  const [currentQuestion] = useState({
    type: 'touch',
    title: '수상한 부분을 찾아보세요',
    content: '택배 배송 조회 URL: http://safe-delivery.kr/tracking?id=1234',
    correctParts: [{ x: 10, y: 50, width: 200, height: 30 }]
  });

  return (
    <div className="p-6">
      <div className="flex items-center mb-8">
        <ChevronLeft className="w-8 h-8 cursor-pointer" onClick={onBack} />
        <h1 className="text-3xl font-bold ml-4">퀴즈</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="text-2xl font-bold mb-6">{currentQuestion.title}</div>
          <div className="bg-gray-100 p-6 rounded-xl text-xl mb-6 min-h-48">
            {currentQuestion.content}
          </div>
          <button className="w-full bg-blue-600 text-white text-xl py-4 rounded-xl hover:bg-blue-700">
            정답 제출하기
          </button>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription className="text-lg">
          💡 힌트: URL이 진짜 택배 회사 주소인지 확인해보세요
        </AlertDescription>
      </Alert>
    </div>
  );
};

// 뱃지 화면
const BadgesScreen = ({ onBack }) => {
  const badges = [
    { id: 1, name: '첫 퀴즈', icon: <BookOpen className="w-12 h-12" />, acquired: true },
    { id: 2, name: '안전왕', icon: <Shield className="w-12 h-12" />, acquired: true },
    { id: 3, name: '택배 전문가', icon: <Package className="w-12 h-12" />, acquired: true },
    { id: 4, name: '통화 달인', icon: <Phone className="w-12 h-12" />, acquired: false },
    { id: 5, name: '카드 보안', icon: <CreditCard className="w-12 h-12" />, acquired: false },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-8">
        <ChevronLeft className="w-8 h-8 cursor-pointer" onClick={onBack} />
        <h1 className="text-3xl font-bold ml-4">나의 뱃지</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {badges.map((badge) => (
          <Card key={badge.id} className={!badge.acquired ? 'opacity-50' : ''}>
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

// 메인 앱 컴포넌트
const PhishingEducationApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'level':
        return <LevelScreen onBack={handleBack} />;
      case 'quiz':
        return <QuizScreen onBack={handleBack} />;
      case 'badges':
        return <BadgesScreen onBack={handleBack} />;
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
              currentScreen === 'home' ? 'text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => handleNavigate('home')}
          >
            <Home className="w-8 h-8" />
            <span className="text-lg">홈</span>
          </div>
          <div 
            className={`flex flex-col items-center cursor-pointer ${
              currentScreen === 'quiz' ? 'text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => handleNavigate('quiz')}
          >
            <BookOpen className="w-8 h-8" />
            <span className="text-lg">퀴즈</span>
          </div>
          <div 
            className={`flex flex-col items-center cursor-pointer ${
              currentScreen === 'badges' ? 'text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => handleNavigate('badges')}
          >
            <Award className="w-8 h-8" />
            <span className="text-lg">뱃지</span>
          </div>
          <div 
            className={`flex flex-col items-center cursor-pointer ${
              currentScreen === 'level' ? 'text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => handleNavigate('level')}
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