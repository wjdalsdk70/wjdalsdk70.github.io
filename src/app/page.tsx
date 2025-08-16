import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Post {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export default function HomePage() {
  // 최근 블로그 포스트 3개 가져오기
  const postsDir = path.join(process.cwd(), "posts");
  let recentPosts: Post[] = [];
  
  try {
    const files = fs.readdirSync(postsDir);
    recentPosts = files
      .map((file) => {
        const content = fs.readFileSync(path.join(postsDir, file), "utf-8");
        const { data } = matter(content);
        return { ...data, slug: file.replace(".mdx", "") } as Post;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  } catch (error) {
    console.log("Posts directory not found");
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            안녕하세요! 👋<br />
            <span className="text-yellow-300">이정민</span>입니다
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            클라우드/백엔드 엔지니어를 꿈꾸는 개발자입니다.<br />
            DevOps, Kubernetes, Kafka, Terraform에 깊은 관심을 가지고 있습니다 🚀
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/projects" 
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              포트폴리오 보기
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              연락하기
            </Link>
          </div>
        </div>
      </section>

      {/* Skills/Stacks Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">기술 스택</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">☁️</div>
                <h3 className="font-semibold text-gray-800">클라우드</h3>
                <p className="text-sm text-gray-600 mt-2">AWS, Azure, GCP</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🐳</div>
                <h3 className="font-semibold text-gray-800">DevOps</h3>
                <p className="text-sm text-gray-600 mt-2">Docker, Kubernetes</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold text-gray-800">백엔드</h3>
                <p className="text-sm text-gray-600 mt-2">Node.js, Python, Java</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">🔧</div>
                <h3 className="font-semibold text-gray-800">인프라</h3>
                <p className="text-sm text-gray-600 mt-2">Terraform, Ansible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">주요 프로젝트</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">클라우드 인프라 자동화</h3>
                <p className="text-gray-600 mb-4">Terraform을 활용한 AWS 인프라 자동화 프로젝트</p>
                <Link href="/projects/cloud-automation" className="text-blue-600 hover:underline">
                  자세히 보기 →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Kubernetes 클러스터 관리</h3>
                <p className="text-gray-600 mb-4">다중 노드 K8s 클러스터 구축 및 모니터링</p>
                <Link href="/projects/k8s-cluster" className="text-blue-600 hover:underline">
                  자세히 보기 →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">실시간 데이터 파이프라인</h3>
                <p className="text-gray-600 mb-4">Kafka와 Redis를 활용한 실시간 데이터 처리</p>
                <Link href="/projects/data-pipeline" className="text-blue-600 hover:underline">
                  자세히 보기 →
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/projects" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              모든 프로젝트 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">최근 블로그 글</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">{post.date}</span>
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="text-blue-600 hover:underline text-sm"
                    >
                      읽기 →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/blog" 
              className="inline-block bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition-colors"
            >
              블로그 더 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
