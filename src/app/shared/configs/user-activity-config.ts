import { RowData } from "@shared/models/table";

/**
 * Table configuration for User Activity list
 */
export const UserActivityDetailsData: RowData = {
  headers: [
    { label: "SR.NO", key: "SR.NO", type: "autoIncrementNumber", size: "4%" },
    { label: "User Name", key: "user_name", type: "text" },
    { label: "User ID", key: "user_id", type: "text" },
    { label: "Email", key: "email_id", type: "text" },
    { label: "Enrolling Date", key: "enrolling_date", type: "date" },
    { label: "Followers", key: "follower_no", type: "text" },
    { label: "Following", key: "following_no", type: "text" },
    { label: "Reports", key: "total_reports_no", type: "text" },
    { label: "Scores", key: "total_scores_no", type: "text" },
    { label: "Requests", key: "total_requests_no", type: "text" },
    { label: "Rewards", key: "total_rewards_no", type: "text" },
    { label: "Likes", key: "total_likes_no", type: "text" },
    { label: "Comments", key: "total_comments_no", type: "text" },
    { label: "Post Comment Likes", key: "total_post_comment_likes_no", type: "text" },
    { label: "Request Likes", key: "total_request_like_no", type: "text" },
    { label: "Request Comments", key: "total_request_comment_no", type: "text" },
    { label: "Request Comment Likes", key: "total_request_comment_likes_no", type: "text" },
    { label: "Shares", key: "total_shares_no", type: "text" },
    { label: "Blacklist Count", key: "total_blacklist_user", type: "text" },
    { label: "Refer & Earn", key: "total_refer_and_earn_no", type: "text" },
    { label: "Show Chats History", key: "show_user_chats_history", type: "boolean" },
    { label: "Show Posts History", key: "show_user_posts_history", type: "boolean" },
    { label: "Screen Time (min)", key: "screen_time", type: "text" },
    { label: "Last Active At", key: "last_active_at", type: "datetime" },
    { label: "Status", key: "is_active", type: "boolean" }
  ],
  data: [],
  dataKey: "user_activity_id",
  buttonname: "",
  button: false,
  statuses: [],
  filterfields: ["user_id"],
  isSearch: true
};
