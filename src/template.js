export default ({ body, title }) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
        </head>
        
        <body>
          <div id="root">${body}</div>
          <script src="/assets/bundle.js"></script>
        </body>
      </html>
    `;
};