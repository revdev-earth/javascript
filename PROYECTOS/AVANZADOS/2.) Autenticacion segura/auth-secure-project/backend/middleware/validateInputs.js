import xss from "xss";

// simple sanitizer middleware for JSON body fields
export function sanitizeBody(fields = []) {
  return (req, res, next) => {
    if (!req.body) return next();
    for (const f of fields) {
      if (req.body[f] && typeof req.body[f] === "string") {
        req.body[f] = xss(req.body[f].trim());
      }
    }
    next();
  };
}
