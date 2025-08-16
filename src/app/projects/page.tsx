import Link from "next/link";

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
    featured: true
  },
  {
    id: "k8s-cluster",
    title: "Kubernetes 클러스터 관리",
    description: "다중 노드 K8s 클러스터 구축 및 모니터링 시스템을 구현했습니다.",
    technologies: ["Kubernetes", "Docker", "Prometheus", "Grafana"],
    category: "DevOps",
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/wjdalsdk70/k8s-cluster",
    featured: true
  },
  {
    id: "data-pipeline",
    title: "실시간 데이터 파이프라인",
    description: "Kafka와 Redis를 활용한 실시간 데이터 처리 시스템입니다.",
    technologies: ["Apache Kafka", "Redis", "Node.js", "Docker"],
    category: "Backend",
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/wjdalsdk70/data-pipeline",
    featured: true
  },
  {
    id: "ecommerce-api",
    title: "E-commerce REST API",
    description: "Node.js와 Express를 활용한 전자상거래 백엔드 API입니다.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "Backend",
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/wjdalsdk70/ecommerce-api",
    featured: false
  },
  {
    id: "task-manager",
    title: "태스크 관리 애플리케이션",
    description: "React와 TypeScript로 개발한 프로젝트 관리 도구입니다.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    category: "Frontend",
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/wjdalsdk70/task-manager",
    featured: false
  },
  {
    id: "weather-app",
    title: "날씨 정보 애플리케이션",
    description: "OpenWeatherMap API를 활용한 날씨 정보 제공 앱입니다.",
    technologies: ["React", "API Integration", "CSS3", "Responsive Design"],
    category: "Frontend",
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com/wjdalsdk70/weather-app",
    featured: false
  }
];

const categories = ["All", "Frontend", "Backend", "DevOps", "Full-stack"];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">프로젝트</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            다양한 기술 스택을 활용하여 개발한 프로젝트들을 소개합니다.
            각 프로젝트의 코드와 데모를 확인할 수 있습니다.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Featured Projects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">주요 프로젝트</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => p.featured).map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      자세히 보기
                    </Link>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors text-sm"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Projects */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">모든 프로젝트</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{project.category}</span>
                    {project.featured && (
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      자세히 보기
                    </Link>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors text-sm"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 