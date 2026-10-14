import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, ThumbsUp } from 'lucide-react';

export const CommunityView: React.FC = () => {
  const [likes, setLikes] = useState<{ [key: number]: number }>({
    1: 42,
    2: 128,
    3: 31,
  });

  const posts = [
    {
      id: 1,
      author: 'Elena Rostova',
      avatar: '/src/assets/images/avatar_athlete_female_1792009738266.jpg',
      badge: 'Level 4 Athlete',
      time: '2 hours ago',
      content: 'Just smashed the Home Workout pushup progression routine! Heart rate hit 162 bpm on the final set. Who else is staying consistent this week?',
      stats: '32 mins · 410 Kcal',
      replies: 8,
    },
    {
      id: 2,
      author: 'Marcus Lind',
      avatar: '/src/assets/images/avatar_athlete_male_1792009738421.jpg',
      badge: 'Hydration Master',
      time: '5 hours ago',
      content: 'Hit 2.8L water target by 4 PM today using the glass tracker matrix. Huge difference in evening mental clarity and muscle recovery.',
      stats: '2.8L Daily Hydration Met',
      replies: 15,
    },
    {
      id: 3,
      author: 'Andreas Vance',
      avatar: '/src/assets/images/avatar_user_andreas_1792009739355.jpg',
      badge: 'Pro Member',
      time: 'Yesterday',
      content: 'Down to 82.0 kg from 84.5 kg over the past 4 weeks with the deep sleep protocol and calorie balancing. Feeling lighter and faster on the morning runs!',
      stats: 'Weight Goal Achieved: 82 Kg',
      replies: 24,
    },
  ];

  const toggleLike = (id: number) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Community & Member Feed</h2>
        <p className="text-xs text-slate-500 mt-1">
          Connect with 5.8K+ fitness members, share routines, and celebrate milestones.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{post.author}</span>
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {post.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{post.time}</span>
                </div>
              </div>

              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                {post.stats}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {post.content}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100/80 text-xs text-slate-400">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-1.5 hover:text-rose-500 transition-colors cursor-pointer"
              >
                <Heart size={15} className="hover:fill-rose-500" />
                <span>{likes[post.id]} Cheers</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
                <MessageCircle size={15} />
                <span>{post.replies} Replies</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-slate-700 transition-colors cursor-pointer">
                <Share2 size={15} />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
