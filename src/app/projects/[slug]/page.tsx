import Link from "next/link";
import { notFound } from "next/navigation";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  longDescription: string;
  challenges: string[];
  solutions: string[];
  learnings: string[];
}

const projects: Project[] = [
  {
    id: "cloud-automation",
    title: "클라우드 인프라 자동화",
    description: "Terraform을 활용한 AWS 인프라 자동화 프로젝트로, VPC, EC2, RDS, Lambda 등을 코드로 관리합니다.",
    technologies: ["Terraform", "AWS", "Docker", "GitHub Actions"],
    category: "DevOps",
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/wjdalsdk70/cloud-automation",
    featured: true,
    longDescription: "이 프로젝트는 AWS 클라우드 인프라를 코드로 관리하는 Infrastructure as Code(IaC) 패턴을 구현한 것입니다. Terraform을 사용하여 VPC, 서브넷, 보안 그룹, EC2 인스턴스, RDS 데이터베이스, Lambda 함수 등을 자동으로 프로비저닝하고 관리할 수 있습니다.",
    challenges: [
      "복잡한 AWS 리소스 간의 의존성 관리",
      "멀티 환경(개발/스테이징/프로덕션) 설정",
      "보안 정책 및 규정 준수 요구사항 충족",
      "비용 최적화 및 리소스 사용량 모니터링"
    ],
    solutions: [
      "Terraform 모듈화를 통한 재사용 가능한 인프라 코드 작성",
      "GitHub Actions를 활용한 CI/CD 파이프라인 구축",
      "AWS Config 및 CloudTrail을 통한 보안 모니터링",
      "Cost Explorer 및 태깅 전략을 통한 비용 관리"
    ],
    learnings: [
      "IaC의 중요성과 장점에 대한 깊은 이해",
      "Terraform 모듈 설계 및 버전 관리 전략",
      "클라우드 보안 모범 사례 적용",
      "DevOps 문화와 협업 프로세스 개선"
    ]
  },
  {
    id: "k8s-cluster",
    title: "Kubernetes 클러스터 관리",
    description: "다중 노드 K8s 클러스터 구축 및 모니터링 시스템을 구현했습니다.",
    technologies: ["Kubernetes", "Docker", "Prometheus", "Grafana"],
    category: "DevOps",
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/wjdalsdk70/k8s-cluster",
    featured: true,
    longDescription: "Kubernetes 클러스터를 구축하고 운영하는 프로젝트입니다. 다중 노드 환경에서 컨테이너 오케스트레이션을 구현하고, Prometheus와 Grafana를 활용하여 클러스터 상태를 모니터링하는 시스템을 구축했습니다.",
    challenges: [
      "다중 노드 클러스터 설정 및 네트워크 구성",
      "컨테이너 리소스 관리 및 스케줄링 최적화",
      "모니터링 및 로깅 시스템 구축",
      "보안 정책 및 RBAC 설정"
    ],
    solutions: [
      "kubeadm을 활용한 클러스터 초기화 및 노드 추가",
      "ResourceQuota와 LimitRange를 통한 리소스 제한 설정",
      "Prometheus Operator를 통한 모니터링 스택 구축",
      "Fluentd와 Elasticsearch를 활용한 중앙화된 로깅"
    ],
    learnings: [
      "Kubernetes 아키텍처 및 핵심 개념 이해",
      "컨테이너 오케스트레이션의 복잡성과 해결 방법",
      "클라우드 네이티브 모니터링 도구 활용",
      "DevOps 자동화 및 운영 효율성 향상"
    ]
  },
  {
    id: "data-pipeline",
    title: "실시간 데이터 파이프라인",
    description: "Kafka와 Redis를 활용한 실시간 데이터 처리 시스템입니다.",
    technologies: ["Apache Kafka", "Redis", "Node.js", "Docker"],
    category: "Backend",
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/wjdalsdk70/data-pipeline",
    featured: true,
    longDescription: "실시간으로 생성되는 대용량 데이터를 처리하는 스트리밍 파이프라인을 구축한 프로젝트입니다. Apache Kafka를 메시지 브로커로 사용하고, Redis를 캐싱 및 세션 저장소로 활용하여 고성능 데이터 처리 시스템을 구현했습니다.",
    challenges: [
      "대용량 실시간 데이터 처리 및 성능 최적화",
      "데이터 일관성 및 장애 복구 메커니즘 구현",
      "확장 가능한 아키텍처 설계",
      "데이터 품질 및 검증 시스템 구축"
    ],
    solutions: [
      "Kafka 파티셔닝 및 컨슈머 그룹을 통한 병렬 처리",
      "Redis Cluster를 활용한 고가용성 캐싱",
      "마이크로서비스 아키텍처 패턴 적용",
      "데이터 검증 및 모니터링 파이프라인 구축"
    ],
    learnings: [
      "스트리밍 데이터 처리의 특성과 도전 과제",
      "메시지 브로커와 캐싱 시스템의 최적화 전략",
      "분산 시스템 설계 및 운영 경험",
      "데이터 엔지니어링의 핵심 개념과 실무 적용"
    ]
  }
];

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4">
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            {project.description}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Project Overview */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">프로젝트 개요</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {project.longDescription}
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-3">사용 기술</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-3">프로젝트 링크</h3>
              <div className="space-y-2">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:underline"
                  >
                    <span>📚</span>
                    <span>GitHub 저장소</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-green-600 hover:underline"
                  >
                    <span>🌐</span>
                    <span>라이브 데모</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">도전 과제 & 해결 방법</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-4 text-red-600">도전 과제</h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-4 text-green-600">해결 방법</h3>
              <ul className="space-y-3">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Key Learnings */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">주요 학습 내용</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.learnings.map((learning, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600 text-sm">💡</span>
                </div>
                <span className="text-gray-700">{learning}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <section className="text-center">
          <Link 
            href="/projects"
            className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
          >
            ← 모든 프로젝트 보기
          </Link>
        </section>
      </div>
    </div>
  );
} 