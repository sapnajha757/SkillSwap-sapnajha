import React from 'react';

export const Avatar = ({ src, name = 'User', className = 'w-10 h-10 text-sm' }) => {
  const initial = name ? name.trim().charAt(0).toUpperCase() : 'U';

  if (src && src.trim() !== '') {
    return (
      <img
        src={src}
        alt={name}
        className={`${className} rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-xs shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${className} rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-extrabold flex items-center justify-center ring-2 ring-indigo-500/20 shadow-md shrink-0`}
    >
      {initial}
    </div>
  );
};
