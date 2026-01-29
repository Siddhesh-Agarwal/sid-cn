"use client";

import React from "react";

import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DisplayPreviewAndCodeProps {
  children: React.ReactElement;
  className?: string;
}

export function DisplayPreviewAndCode({
  children,
  className,
}: DisplayPreviewAndCodeProps) {
  const codeString = jsxToString(children);

  return (
    <Tabs defaultValue="preview" className={className}>
      <TabsList className="w-full justify-start">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-4 rounded-md border p-6">
        <div className="flex min-h-100 w-full items-center justify-center">
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-4">
        <CodeBlock text={codeString} />
      </TabsContent>
    </Tabs>
  );
}

function jsxToString(element: React.ReactElement, indent = 0): string {
  if (!element) return "";
  const startIndent = "  ".repeat(indent);

  if (typeof element === "string") return startIndent + element;
  if (typeof element === "number") return startIndent + String(element);
  if (typeof element === "boolean") return "";

  if (Array.isArray(element)) {
    return element
      .map((child) => jsxToString(child, indent))
      .filter((s) => s.length > 0)
      .join("\n");
  }

  if (React.isValidElement(element)) {
    const type = element.type as any;
    const name =
      typeof type === "string"
        ? type
        : type.displayName || type.name || "Component";

    const props = element.props as Record<string, any>;
    const propsString = Object.entries(props)
      .filter(([key]) => key !== "children")
      .map(([key, value]) => {
        if (value === true) return key;
        if (typeof value === "string") return `${key}="${value}"`;
        return `${key}={...}`;
      })
      .join(" ");

    const children = props.children;
    if (!children) {
      return `${startIndent}<${name}${propsString ? ` ${propsString}` : ""} />`;
    }

    const childrenString = Array.isArray(children)
      ? children
          .map((c) => jsxToString(c, indent + 1))
          .filter((s) => s.length > 0)
          .join("\n")
      : jsxToString(children, indent + 1);

    if (childrenString.includes("<") || childrenString.length > 40) {
      return `${startIndent}<${name}${propsString ? ` ${propsString}` : ""}>\n${childrenString}\n${startIndent}</${name}>`;
    }

    return `${startIndent}<${name}${propsString ? ` ${propsString}` : ""}>${childrenString.trim()}</${name}>`;
  }

  return "";
}
