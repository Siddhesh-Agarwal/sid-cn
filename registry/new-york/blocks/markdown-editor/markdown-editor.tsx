"use client";

import { Bold, Italic, Link, List, ListOrdered } from "lucide-react";
import { marked } from "marked";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/registry/new-york/components/button";

export interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export function MarkdownEditor({
  initialValue = "",
  onChange,
}: MarkdownEditorProps) {
  const [markdown, setMarkdown] = React.useState(initialValue);
  const [parsedHtml, setParsedHtml] = React.useState<string>("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleMarkdownChange = React.useCallback(
    (value: string) => {
      setMarkdown(value);
      onChange?.(value);
    },
    [onChange],
  );

  const parseMarkdown = React.useCallback(
    async (text: string): Promise<string> => {
      try {
        const result = await marked(text, {
          breaks: true,
          gfm: true,
        });
        return result;
      } catch (error) {
        console.error("Error parsing markdown:", error);
        return text;
      }
    },
    [],
  );

  const insertMarkdown = React.useCallback(
    (before: string, after = "", placeholder = "") => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);

      // Check if the selected text is already wrapped with the markdown syntax
      const beforeStart = start - before.length;
      const afterEnd = end + after.length;
      const textBefore = textarea.value.substring(beforeStart, start);
      const textAfter = textarea.value.substring(end, afterEnd);

      const isAlreadyFormatted = textBefore === before && textAfter === after;

      if (isAlreadyFormatted && selectedText) {
        // Remove the formatting
        const newText =
          textarea.value.substring(0, beforeStart) +
          selectedText +
          textarea.value.substring(afterEnd);

        handleMarkdownChange(newText);

        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            beforeStart,
            beforeStart + selectedText.length,
          );
        }, 0);
      } else if (selectedText) {
        // Check if selected text itself contains the markdown syntax
        const trimmedBefore = before.trim();
        const trimmedAfter = after.trim();

        if (
          selectedText.startsWith(trimmedBefore) &&
          selectedText.endsWith(trimmedAfter) &&
          selectedText.length > trimmedBefore.length + trimmedAfter.length
        ) {
          // Remove formatting from selected text
          const unformattedText = selectedText.substring(
            trimmedBefore.length,
            selectedText.length - trimmedAfter.length,
          );
          const newText =
            textarea.value.substring(0, start) +
            unformattedText +
            textarea.value.substring(end);

          handleMarkdownChange(newText);

          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start, start + unformattedText.length);
          }, 0);
        } else {
          // Add formatting to selected text
          const newText =
            textarea.value.substring(0, start) +
            before +
            selectedText +
            after +
            textarea.value.substring(end);

          handleMarkdownChange(newText);

          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
              start + before.length,
              start + before.length + selectedText.length,
            );
          }, 0);
        }
      } else {
        // No text selected, insert placeholder
        const textToInsert = placeholder;
        const newText =
          textarea.value.substring(0, start) +
          before +
          textToInsert +
          after +
          textarea.value.substring(end);

        handleMarkdownChange(newText);

        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            start + before.length,
            start + before.length + textToInsert.length,
          );
        }, 0);
      }
    },
    [handleMarkdownChange],
  );

  const insertAtLineStart = React.useCallback(
    (prefix: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const value = textarea.value;

      // Find the start of the current line
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = value.indexOf("\n", start);
      const currentLine = value.substring(
        lineStart,
        lineEnd === -1 ? value.length : lineEnd,
      );

      // Check if line already has the prefix
      if (currentLine.startsWith(prefix)) {
        // Remove the prefix
        const newText =
          value.substring(0, lineStart) +
          currentLine.substring(prefix.length) +
          value.substring(lineEnd === -1 ? value.length : lineEnd);
        handleMarkdownChange(newText);
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            start - prefix.length,
            start - prefix.length,
          );
        }, 0);
      } else {
        // Add the prefix
        const newText =
          value.substring(0, lineStart) +
          prefix +
          currentLine +
          value.substring(lineEnd === -1 ? value.length : lineEnd);
        handleMarkdownChange(newText);
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            start + prefix.length,
            start + prefix.length,
          );
        }, 0);
      }
    },
    [handleMarkdownChange],
  );

  const formatBold = React.useCallback(
    () => insertMarkdown("**", "**", "bold text"),
    [insertMarkdown],
  );
  const formatItalic = React.useCallback(
    () => insertMarkdown("*", "*", "italic text"),
    [insertMarkdown],
  );
  const formatLink = React.useCallback(
    () => insertMarkdown("[", "](url)", "link text"),
    [insertMarkdown],
  );
  const formatUnorderedList = React.useCallback(
    () => insertAtLineStart("- "),
    [insertAtLineStart],
  );
  const formatOrderedList = React.useCallback(
    () => insertAtLineStart("1. "),
    [insertAtLineStart],
  );

  const formatHeading = React.useCallback(
    (level: number) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const value = textarea.value;

      // Find the start of the current line
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = value.indexOf("\n", start);
      const currentLine = value.substring(
        lineStart,
        lineEnd === -1 ? value.length : lineEnd,
      );

      const headingPrefix = `${"#".repeat(level)} `;

      // Check if line already has any heading
      const existingHeadingMatch = currentLine.match(/^#+\s/);

      if (existingHeadingMatch) {
        // Replace existing heading or remove if same level
        if (existingHeadingMatch[0] === headingPrefix) {
          // Remove heading
          const newText =
            value.substring(0, lineStart) +
            currentLine.substring(existingHeadingMatch[0].length) +
            value.substring(lineEnd === -1 ? value.length : lineEnd);
          handleMarkdownChange(newText);
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
              start - existingHeadingMatch[0].length,
              start - existingHeadingMatch[0].length,
            );
          }, 0);
        } else {
          // Replace with new heading level
          const newText =
            value.substring(0, lineStart) +
            headingPrefix +
            currentLine.substring(existingHeadingMatch[0].length) +
            value.substring(lineEnd === -1 ? value.length : lineEnd);
          handleMarkdownChange(newText);
          setTimeout(() => {
            textarea.focus();
            const diff = headingPrefix.length - existingHeadingMatch[0].length;
            textarea.setSelectionRange(start + diff, start + diff);
          }, 0);
        }
      } else {
        // Add heading
        const newText =
          value.substring(0, lineStart) +
          headingPrefix +
          currentLine +
          value.substring(lineEnd === -1 ? value.length : lineEnd);
        handleMarkdownChange(newText);
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            start + headingPrefix.length,
            start + headingPrefix.length,
          );
        }, 0);
      }
    },
    [handleMarkdownChange],
  );

  const formatHorizontalRule = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const value = textarea.value;

    // Insert horizontal rule on a new line
    const beforeCursor = value.substring(0, start);
    const afterCursor = value.substring(start);

    const needsNewlineBefore =
      beforeCursor.length > 0 && !beforeCursor.endsWith("\n");
    const needsNewlineAfter =
      afterCursor.length > 0 && !afterCursor.startsWith("\n");

    const hrText =
      (needsNewlineBefore ? "\n" : "") +
      "---" +
      (needsNewlineAfter ? "\n" : "");
    const newText = beforeCursor + hrText + afterCursor;

    handleMarkdownChange(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + hrText.length, start + hrText.length);
    }, 0);
  };

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const isMac =
        (navigator as Navigator & { userAgentData?: { platform?: string } })
          .userAgentData?.platform?.toLowerCase()
          .includes("mac") ?? /mac|iphone|ipad|ipod/i.test(navigator.userAgent);
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      if (ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "1":
            e.preventDefault();
            formatHeading(1);
            break;
          case "2":
            e.preventDefault();
            formatHeading(2);
            break;
          case "3":
            e.preventDefault();
            formatHeading(3);
            break;
          case "b":
            e.preventDefault();
            formatBold();
            break;
          case "i":
            e.preventDefault();
            formatItalic();
            break;
          case "k":
            e.preventDefault();
            formatLink();
            break;
          case "shift":
            // Handle Ctrl+Shift combinations
            if (e.shiftKey) {
              switch (e.code) {
                case "Digit8": // Ctrl+Shift+8 for unordered list
                  e.preventDefault();
                  formatUnorderedList();
                  break;
                case "Digit7": // Ctrl+Shift+7 for ordered list
                  e.preventDefault();
                  formatOrderedList();
                  break;
              }
            }
            break;
        }
      }

      // Handle Tab key for indentation
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText =
          textarea.value.substring(0, start) +
          "  " +
          textarea.value.substring(end);
        handleMarkdownChange(newText);
        setTimeout(() => {
          textarea.setSelectionRange(start + 2, start + 2);
        }, 0);
      }
    },
    [
      handleMarkdownChange,
      formatHeading,
      formatBold,
      formatItalic,
      formatLink,
      formatUnorderedList,
      formatOrderedList,
    ],
  );

  React.useEffect(() => {
    const updatePreview = async () => {
      if (markdown) {
        const parsedHtml = await parseMarkdown(markdown);
        setParsedHtml(parsedHtml);
      } else {
        setParsedHtml("");
      }
    };
    updatePreview();
  }, [markdown, parseMarkdown]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="border rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b bg-muted/50 overflow-x-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatHeading(1)}
            title="Heading 1 (Ctrl+1)"
          >
            <span className="text-xs font-bold">H1</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatHeading(2)}
            title="Heading 2 (Ctrl+2)"
          >
            <span className="text-xs font-bold">H2</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => formatHeading(3)}
            title="Heading 3 (Ctrl+3)"
          >
            <span className="text-xs font-bold">H3</span>
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={formatBold}
            title="Toggle Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={formatItalic}
            title="Toggle Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={formatUnorderedList}
            title="Unordered List (Ctrl+Shift+8)"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={formatOrderedList}
            title="Ordered List (Ctrl+Shift+7)"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={formatLink}
            title="Link (Ctrl+K)"
          >
            <Link className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={formatHorizontalRule}
            title="Horizontal Rule"
          >
            <span className="text-xs font-bold">HR</span>
          </Button>
        </div>

        {/* Editor and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Editor */}
          <Textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => handleMarkdownChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Start writing your markdown here..."
            className="w-full h-full min-h-[500px] border-0 resize-none font-mono text-sm rounded-none"
          />

          {/* Preview */}
          <div className="border-l bg-muted/20">
            <div className="p-4 h-full overflow-auto">
              <div className="prose prose-sm max-w-none prose-headings:mt-4 prose-headings:mb-2 prose-p:mb-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1">
                {markdown ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: parsedHtml,
                    }}
                  />
                ) : (
                  <p className="text-muted-foreground italic">
                    Preview will appear here as you type...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t bg-muted/50 text-sm text-muted-foreground">
          <div>
            {markdown.length} characters, {markdown.split("\n").length} lines
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-xs">
              <span className="font-medium">Shortcuts:</span> Ctrl+B (Bold),
              Ctrl+I (Italic), Ctrl+K (Link)
            </div>
          </div>
          <div className="hidden sm:block md:hidden">Markdown Editor</div>
        </div>
      </div>
    </div>
  );
}
