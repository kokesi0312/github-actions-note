import fs from 'fs';
import path from 'path';

// 成果物のパス
const ARTIFACTS_DIR = '.note-artifacts';
const INPUT_FILE = path.join(ARTIFACTS_DIR, 'final.json');
const OUTPUT_FILE_MD = path.join(ARTIFACTS_DIR, 'final_post.md');
const OUTPUT_FILE_TAGS = path.join(ARTIFACTS_DIR, 'final_tags.txt');

try {
    // 1. JSON ファイルを読み込む
    const jsonString = fs.readFileSync(INPUT_FILE, 'utf8');
    const data = JSON.parse(jsonString);

    // 2. タイトルと本文を抽出し、Markdown形式の本文を構築
    const title = data.title || 'タイトルなし';
    const bodyContent = data.body || '本文なし';
    
    // タイトルをMarkdownの見出しとして本文の先頭に追加
    const finalMarkdown = `# ${title}\n\n${bodyContent}`;

    // 3. Markdown ファイルとして保存
    fs.writeFileSync(OUTPUT_FILE_MD, finalMarkdown);
    console.log(`✅ Markdownファイルを出力しました: ${OUTPUT_FILE_MD}`);

    // 4. タグファイルを別途保存（noteのタグ欄に貼り付けやすいようにカンマ区切りで）
    const tagsString = Array.isArray(data.tags) 
        ? data.tags.join(', ') // "GitHubActions, CI/CD, 自動化, ..." の形式
        : '';
        
    fs.writeFileSync(OUTPUT_FILE_TAGS, tagsString);
    console.log(`✅ タグファイルを出力しました: ${OUTPUT_FILE_TAGS}`);

} catch (error) {
    console.error('❌ JSONの変換中にエラーが発生しました:', error.message);
    process.exit(1);
}
