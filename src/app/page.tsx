export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">👨‍💻 JeongMin's Portfolio</h1>
      <p className="text-gray-700 mb-6">
        안녕하세요, 클라우드/백엔드 엔지니어 지망생 <b>이정민</b>입니다.
        DevOps, Kubernetes, Kafka, Terraform에 관심이 많습니다 🚀
      </p>

      <div className="grid grid-cols-2 gap-6">
        <a href="/blog" className="p-4 border rounded-lg shadow hover:bg-gray-50">
          📒 기술 블로그
        </a>
        <a href="https://github.com/wjdalsdk70" className="p-4 border rounded-lg shadow hover:bg-gray-50">
          💻 GitHub
        </a>
      </div>
    </div>
  );
}
