# Vietnamese Content

## Language Settings

- **Default Language**: Tiếng Việt
- **Locale**: vi-VN
- **Currency**: VND (₫)

## Price Formatting

```typescript
// Correct format: 1.450.000₫
function formatPrice(value: number): string {
  return new Intl.NumberFormat('vi-VN').format(value) + '₫';
}

// Usage
formatPrice(1450000); // "1.450.000₫"
formatPrice(500000);  // "500.000₫"
```

## Number Formatting

```typescript
// Vietnamese locale for numbers too
new Intl.NumberFormat('vi-VN').format(1234567); // "1.234.567"
```

## Date Formatting

```typescript
// Vietnamese date format
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

// Usage
formatDate(new Date('2024-01-15')); // "15/01/2024"
```

## UI Text Rules

### Button Labels

```typescript
// Vietnamese button labels
const BUTTON_LABELS = {
  addToCart: 'Thêm vào giỏ',
  checkout: 'Thanh toán',
  viewCart: 'Xem giỏ hàng',
  continueShopping: 'Tiếp tục mua sắm',
  apply: 'Áp dụng',
  cancel: 'Hủy',
  confirm: 'Xác nhận',
  save: 'Lưu',
  delete: 'Xóa',
  edit: 'Sửa',
  search: 'Tìm kiếm',
  filter: 'Lọc',
  sort: 'Sắp xếp',
};
```

### Product Status Labels

```typescript
const PRODUCT_LABELS = {
  inStock: 'Còn hàng',
  outOfStock: 'Hết hàng',
  lowStock: 'Sắp hết hàng',
  newArrival: 'Hàng mới về',
  bestSeller: 'Bán chạy',
  onSale: 'Đang giảm giá',
};
```

### Error Messages

```typescript
const ERROR_MESSAGES = {
  required: 'Vui lòng nhập trường này',
  invalidEmail: 'Email không hợp lệ',
  invalidPhone: 'Số điện thoại không hợp lệ',
  minQuantity: 'Số lượng tối thiểu là 1',
  maxQuantity: 'Số lượng tối đa là 99',
  paymentFailed: 'Thanh toán thất bại. Vui lòng thử lại.',
  networkError: 'Lỗi kết nối. Vui lòng kiểm tra mạng.',
};
```

## Page Titles

```typescript
const PAGE_TITLES = {
  home: 'NhoNho - Rượu Vang Cao Cấp Việt Nam',
  shop: 'Cửa hàng - NhoNho',
  product: '{productName} - NhoNho',
  cart: 'Giỏ hàng - NhoNho',
  checkout: 'Thanh toán - NhoNho',
  account: 'Tài khoản - NhoNho',
  orders: 'Đơn hàng - NhoNho',
  blog: 'Blog - NhoNho',
  events: 'Sự kiện - NhoNho',
  about: 'Về chúng tôi - NhoNho',
  contact: 'Liên hệ - NhoNho',
  login: 'Đăng nhập - NhoNho',
  register: 'Đăng ký - NhoNho',
  forgotPassword: 'Quên mật khẩu - NhoNho',
  policy: 'Chính sách - NhoNho',
  faq: 'Câu hỏi thường gặp - NhoNho',
};
```

## Vietnamese Wine Terms

```typescript
const WINE_TERMS = {
  // Wine types
  redWine: 'Rượu vang đỏ',
  whiteWine: 'Rượu vang trắng',
  roseWine: 'Rượu vang hồng',
  sparklingWine: 'Rượu vang sủi',
  orangeWine: 'Rượu vang cam',

  // Grape varieties
  cabernetSauvignon: 'Cabernet Sauvignon',
  pinotNoir: 'Pinot Noir',
  merlot: 'Merlot',
  chardonnay: 'Chardonnay',
  sauvignonBlanc: 'Sauvignon Blanc',

  // Regions
  bordeaux: 'Bordeaux',
  champagne: 'Champagne',
  burgundy: 'Burgundy',
  languedoc: 'Languedoc',

  //品酒术语
  tasting: 'Nếm rượu',
  sommelier: 'Chuyên gia rượu vang',
  vintage: 'Năm sản xuất',
  appellation: 'Vùng trồng nho',
};
```

## Age Verification

Required for alcohol sales (Nghị định 117/2020/NĐ-CP):

```typescript
// Age verification message
const AGE_WARNING = 'NhoNho cam kết rằng bạn đủ 18 tuổi để mua rượu vang.';
const AGE_RESTRICTION = 'Bạn phải đủ 18 tuổi để mua rượu vang.';
```
