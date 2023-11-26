// collections/Media.ts
import { CollectionConfig } from 'payload/types';
import path from 'path';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [

    {
      name: 'type',
      label: 'Media Type',
      type: 'select',
      options: ['Image', 'Video', 'Short Video'],
      required: true,
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'text',
    },
    {
      name: 'posts',
      label: 'Posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
    },
  ],
  upload: {
    staticDir: path.resolve(__dirname, '../../../rashi_frontend/public/assets/media'),
  },
};

export default Media;
