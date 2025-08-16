export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl opacity-90">
            클라우드/백엔드 엔지니어를 꿈꾸는 개발자 이정민입니다
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">자기소개</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              안녕하세요! 저는 클라우드 기술과 백엔드 개발에 깊은 관심을 가지고 있는 개발자입니다.
              새로운 기술을 배우는 것을 좋아하며, 문제 해결을 위한 창의적인 접근 방식을 추구합니다.
            </p>
            <p>
              DevOps 문화와 클라우드 네이티브 아키텍처에 대한 이해를 바탕으로, 
              확장 가능하고 안정적인 시스템을 구축하는 것을 목표로 하고 있습니다.
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">학력</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-blue-600 text-xl">🎓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">컴퓨터공학과</h3>
                <p className="text-gray-600">한국대학교</p>
                <p className="text-gray-500 text-sm">2020년 3월 - 2024년 2월</p>
                <p className="text-gray-700 mt-2">
                  소프트웨어 공학, 데이터구조, 알고리즘, 운영체제 등 컴퓨터 공학의 기초를 탄탄히 다졌습니다.
                  특히 클라우드 컴퓨팅과 분산 시스템에 대한 수업을 통해 현대적인 소프트웨어 아키텍처에 대한 이해를 높였습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">경력 및 경험</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-green-600 text-xl">💼</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">백엔드 개발 인턴</h3>
                <p className="text-gray-600">테크스타트업</p>
                <p className="text-gray-500 text-sm">2023년 6월 - 2023년 12월</p>
                <ul className="text-gray-700 mt-2 space-y-1">
                  <li>• Node.js와 Express를 활용한 REST API 개발</li>
                  <li>• MongoDB 데이터베이스 설계 및 최적화</li>
                  <li>• Docker 컨테이너화 및 배포 자동화</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-purple-600 text-xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">클라우드 인프라 프로젝트</h3>
                <p className="text-gray-600">개인 프로젝트</p>
                <p className="text-gray-500 text-sm">2023년 3월 - 현재</p>
                <ul className="text-gray-700 mt-2 space-y-1">
                  <li>• AWS 서비스 활용한 인프라 구축</li>
                  <li>• Terraform을 통한 Infrastructure as Code 구현</li>
                  <li>• Kubernetes 클러스터 구축 및 관리</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <span className="text-orange-600 text-xl">🏆</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">해커톤 참여</h3>
                <p className="text-gray-600">대학생 해커톤</p>
                <p className="text-gray-500 text-sm">2023년 11월</p>
                <ul className="text-gray-700 mt-2 space-y-1">
                  <li>• 48시간 동안 실시간 데이터 처리 시스템 개발</li>
                  <li>• Kafka와 Redis를 활용한 스트리밍 데이터 파이프라인 구축</li>
                  <li>• 팀 프로젝트 우수상 수상</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">기술 스택</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-3">프로그래밍 언어</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">JavaScript/TypeScript</span>
                  <span className="text-blue-600 font-medium">상급</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Python</span>
                  <span className="text-blue-600 font-medium">중급</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Java</span>
                  <span className="text-blue-600 font-medium">중급</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-3">클라우드 & DevOps</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">AWS</span>
                  <span className="text-blue-600 font-medium">중급</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Docker</span>
                  <span className="text-blue-600 font-medium">중급</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Kubernetes</span>
                  <span className="text-blue-600 font-medium">초급</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goals */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">목표 및 비전</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>단기 목표 (1-2년):</strong> 클라우드 네이티브 애플리케이션 개발 및 
              DevOps 엔지니어링 역량 강화
            </p>
            <p>
              <strong>중기 목표 (3-5년):</strong> 대규모 분산 시스템 설계 및 운영 경험을 
              쌓아 클라우드 아키텍트로 성장
            </p>
            <p>
              <strong>장기 목표 (5년+):</strong> 클라우드 기술 트렌드를 선도하고, 
              팀과 조직의 기술적 성장을 이끄는 리더가 되는 것
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 