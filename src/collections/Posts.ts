// collections/Posts.js

import { CollectionConfig } from 'payload/types';

const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Short Video', value: 'short_video' },
        { label: 'video', value: 'video' },
        { label: 'image', value: 'image' },
      ],
      required: true,
    },
    {
      name: 'media',
      label: 'Media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
    },
  ],
};

export default Posts;
