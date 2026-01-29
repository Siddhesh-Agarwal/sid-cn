import Link from "next/link";
import { Button } from "@/registry/new-york/components/button";
import { Icons } from "@/registry/new-york/components/icons";
import humanFormat from "human-format";

export function GitHubLink() {
  const { username, repo } = { username: "Siddhesh-Agarwal", repo: "sid-cn" };
  return (
    <Link
      href={`https://github.com/${username}/${repo}`}
      target="_blank"
      rel="noreferrer"
    >
      <Button size="sm" variant="ghost">
        <Icons.gitHub />
        <StarsCount username={username} repo={repo} />
      </Button>
    </Link>
  );
}

async function getStarsCount(
  username: string,
  repo: string,
): Promise<{ stargazers_count: number }> {
  const data = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
    next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
  });
  return data.json();
}

export async function StarsCount({
  username,
  repo,
}: {
  username: string;
  repo: string;
}) {
  const json = await getStarsCount(username, repo);

  if (!json.stargazers_count) return null;

  return (
    <span className="text-muted-foreground text-xs tabular-nums">
      {humanFormat(json.stargazers_count, {
        maxDecimals: 1,
      })}
    </span>
  );
}
