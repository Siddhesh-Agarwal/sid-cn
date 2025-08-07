import Link from "next/link";

import { Icons } from "@/registry/new-york/components/icons";
import { Button } from "@/registry/new-york/components/button";

export function GitHubLink() {
  const { username, repo } = { username: "Siddhesh-Agarwal", repo: "sid-cn" };
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link
        href={`https://github.com/${username}/${repo}`}
        target="_blank"
        rel="noreferrer"
      >
        <Icons.gitHub />
        <StarsCount username={username} repo={repo} />
      </Link>
    </Button>
  );
}

export async function StarsCount({
  username,
  repo,
}: {
  username: string;
  repo: string;
}) {
  const data = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
    next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
  });
  const json = await data.json();

  return (
    <span className="text-muted-foreground text-xs tabular-nums">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()}
    </span>
  );
}
