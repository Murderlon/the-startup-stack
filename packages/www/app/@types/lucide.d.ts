declare module 'lucide-react' {
  // Only show type suggestions for Lucide icons with a prefix.
  // Otherwise you editor will try to import an icon instead of some component you actually want.
  export * from 'lucide-react/dist/lucide-react.prefixed'
}
