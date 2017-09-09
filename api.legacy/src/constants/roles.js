// Role Configuration used in the Application

export const ROLE = {
  guest: {
    perm: 0,
    th: "รอการยืนยันสิทธิ"
  },
  guest: {
    perm: 1,
    th: "ผู้เรียน"
  },
  admin: {
    perm: 2,
    th: "ผู้สอน"
  },
  admin: {
    perm: 3,
    th: "ผู้ดูแลระบบ"
  }
}

export const roles = ["guest", "guest", "admin", "admin"]

export const VIEW_ROLE = "guest"
export const MODIFY_ROLE = "admin"
