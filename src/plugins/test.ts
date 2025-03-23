import { Plugin } from "vite";
export default function MyPlugin(): Plugin {
  return {
    name: "my-plugin",
    //通用钩子
    options(options) {
      console.log("options", JSON.stringify(options));
    },
    buildStart(options) {
      console.log("buildStart", options);
    },
    // // 构建钩子
    // resolveId(id) {
    //   console.log("resolveId", id);
    // },
    // load(id) {
    //   console.log("load", id);
    // },
    // transform(code, id) {
    //   console.log("transform", code, id);
    // },
    // buildEnd() {
    //   console.log("buildEnd");
    // },
    // closeBundle() {
    //   console.log("closeBundle");
    // },
    // //vite独有钩子
    // // 配置钩子 (config: UserConfig, env: { mode: string, command: string }) => UserConfig | null | void
    // config(config) {
    //   console.log("config", config);
    //   return config;
    // },
    // // 配置解析钩子 (config: ResolvedConfig) => void | Promise<void>
    // configResolved(config) {
    //   console.log("configResolved", config);
    // },
    // // 插件钩子  (server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>
    // configureServer(server) {
    //   console.log("configureServer", server);
    // },
    // // 插件钩子 (html: string, ctx: { filename: string }) => string | Promise<string>
    // transformIndexHtml(html) {
    //   console.log("transformIndexHtml", html);
    //   return html;
    // },
    // // 插件钩子 (ctx: { filename: string, moduleGraph: ModuleNode, server: ViteDevServer }) => void | Promise<void>
    // handleHotUpdate(ctx) {
    //   console.log("handleHotUpdate", ctx);
    // },
    // apply(config, env) {
    //   console.log("apply", config, env);
    //   return true;
    // },
    // // 插件钩子 (server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>
    // configurePreviewServer(server) {
    //   console.log("configurePreviewServer", server);
    // },
    // transform(code: string, id: string) {
    //   if (id.includes("test.ts")) {
    //     const lines = code.split("\n");
    //     const newLines: string[] = [];
    //     for (let i = 0; i < lines.length; i++) {
    //       const line = lines[i];
    //       if (line.includes("console.log")) {
    //         newLines.push(line);
    //         newLines.push('console.log("new line")');
    //       } else {
    //         newLines.push(line);
    //       }
    //     }
    //     return newLines.join("\n");
    //   }
    //   return code;
    // },
  };
}
