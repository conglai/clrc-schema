# clrc schema
> 从来Schema React组件

## 枚举的Schema的约束

```
{
  type: 'enum',
  title: '选项名',
  enum: [
    { value: 'A', name: 'A'}, //value和name必须是这样的格式
    { value: 'B', name: 'B'},
    { value: 'C', name: 'C'},
    { value: 'D', name: 'D'},
  ]
}
```
