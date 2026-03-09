// middleware/authorize.js
const authorize = (requiredPermissions = []) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];

    // Kiểm tra quyền được ủy quyền
    const delegatedPermissions = req.user.delegatedPermissions || [];
    const allPermissions = [...userPermissions, ...delegatedPermissions];

    const hasPermission = requiredPermissions.every((perm) =>
      allPermissions.includes(perm)
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }

    next();
  };
};

module.exports = authorize;
