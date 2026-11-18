import test from 'node:test';
import assert from 'node:assert/strict';
import detectMediaType from '../utils/detectMediaType.ts';

test('recognises YouTube and TikTok links, including short youtu.be links', () => {
  assert.equal(detectMediaType('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), 'youtube');
  assert.equal(detectMediaType('https://youtu.be/dQw4w9WgXcQ'), 'youtube');
  assert.equal(detectMediaType('https://www.tiktok.com/@user/video/123'), 'tiktok');
});

test('classifies direct files by extension, ignoring case', () => {
  assert.equal(detectMediaType('https://cdn.example.org/clip.mp4'), 'video');
  assert.equal(detectMediaType('https://cdn.example.org/clip.WEBM'), 'video');
  assert.equal(detectMediaType('https://cdn.example.org/photo.jpg'), 'image');
  assert.equal(detectMediaType('https://cdn.example.org/logo.SVG'), 'image');
});

test('treats known placeholder image services as images without an extension', () => {
  assert.equal(detectMediaType('https://picsum.photos/200/300'), 'image');
  assert.equal(detectMediaType('https://images.unsplash.com/photo-123'), 'image');
});

test('platform links win over file extensions', () => {
  // A YouTube thumbnail ends in .jpg but is still served from YouTube.
  assert.equal(detectMediaType('https://img.youtube.com/vi/abc/0.jpg'), 'youtube');
});

test('anything else is unknown, including documents and empty input', () => {
  assert.equal(detectMediaType('https://example.org/tor.pdf'), 'unknown');
  assert.equal(detectMediaType('https://example.org/'), 'unknown');
  assert.equal(detectMediaType(''), 'unknown');
});
