import Link from "next/link";

export default function NotFound() {
  return (
    <div className="globalCard">
      <h2>404</h2>
      <p>Страница не найдена</p>
      <p>
        Перейти{" "}
        <Link href="/blog">
          <b>на Главную</b>
        </Link>
      </p>
    </div>
  );
}
