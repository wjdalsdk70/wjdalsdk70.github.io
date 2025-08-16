export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">연락하기</h1>
          <p className="text-xl opacity-90">
            궁금한 점이 있거나 협업하고 싶으시다면 언제든 연락주세요!
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">메시지 보내기</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="문의 제목을 입력해주세요"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  메시지 *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="메시지를 입력해주세요..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                메시지 보내기
              </button>
            </form>
          </section>

          {/* Contact Information */}
          <section className="space-y-8">
            {/* Personal Info */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">연락처 정보</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <span className="text-blue-600 text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">이메일</h3>
                    <a href="mailto:contact@example.com" className="text-blue-600 hover:underline">
                      contact@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="text-green-600 text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">전화번호</h3>
                    <a href="tel:+82-10-1234-5678" className="text-blue-600 hover:underline">
                      +82-10-1234-5678
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <span className="text-purple-600 text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">위치</h3>
                    <p className="text-gray-600">서울특별시, 대한민국</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">소셜 미디어</h2>
              <div className="space-y-4">
                <a 
                  href="https://github.com/wjdalsdk70" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-gray-800 p-3 rounded-full">
                    <span className="text-white text-xl">📚</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">GitHub</h3>
                    <p className="text-gray-600 text-sm">코드 저장소 및 프로젝트</p>
                  </div>
                </a>

                <a 
                  href="https://linkedin.com/in/jeongmin-lee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-blue-600 p-3 rounded-full">
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">LinkedIn</h3>
                    <p className="text-gray-600 text-sm">전문 네트워킹</p>
                  </div>
                </a>

                <a 
                  href="https://twitter.com/jeongmin_dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-blue-400 p-3 rounded-full">
                    <span className="text-white text-xl">🐦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Twitter</h3>
                    <p className="text-gray-600 text-sm">개발 관련 소식</p>
                  </div>
                </a>

                <a 
                  href="https://blog.example.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-green-600 p-3 rounded-full">
                    <span className="text-white text-xl">📝</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">개인 블로그</h3>
                    <p className="text-gray-600 text-sm">기술 블로그</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">업무 가능 여부</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">프리랜서 프로젝트</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    가능
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">풀타임 포지션</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    검토 중
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">멘토링/코딩 교육</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    가능
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 