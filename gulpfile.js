const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const htmlReplace = require('gulp-html-replace');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const copy = require('gulp-copy');

const uglifyOptions = { output: { comments: false } };

gulp.task('combine-main-css', () => {
  return gulp
    .src([
      'src/css/modern-normalize.css',
      'src/css/variables.css',
      'src/css/base/base.css',
      'src/css/layout/header.css',
      'src/css/layout/page.css',
      'src/css/layout/product-grid.css',
      'src/css/layout/footer.css',
      'src/css/components/buttons.css',
      'src/css/components/tabs.css',
      'src/css/components/product-cards.css',
      'src/css/components/overlay.css',
      'src/css/components/cart.css',
      'src/css/components/checkout.css',
      'src/css/state/animation.css',
    ])
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('combine-admin-css', () => {
  return gulp
    .src([
      'src/css/modern-normalize.css',
      'src/css/variables.css',
      'src/css/components/admin.css',
      'src/css/components/modal.css',
    ])
    .pipe(concat('admin-styles.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('combine-main-js', () => {
  return gulp
    .src([
      'src/js/shared/model.js',
      'src/js/shared/common.js',
      'src/js/products/cafeMenuView.js',
      'src/js/products/cakeMenuView.js',
      'src/js/shared/view.js',
      'src/js/shared/controller.js',
      'src/js/products/cafeMenuController.js',
      'src/js/products/cakeMenuController.js',
      'src/data/products.js',
      'src/js/cart/cartView.js',
      'src/js/cart/cartController.js',
      'src/js/cart/checkoutController.js',
      'src/js/cart/checkoutView.js',
      'src/js/utils/clearLocalStorage.js',
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify(uglifyOptions))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify-admin-js', () => {
  return gulp
    .src([
      'src/js/admin/ordersController.js',
      'src/js/admin/ordersView.js',
      'src/js/admin/pickedUpOrdersController.js',
      'src/js/admin/pickedUpOrdersView.js',
    ])
    .pipe(uglify(uglifyOptions))
    .pipe(gulp.dest('dist/js/admin'));
});

gulp.task('uglify-auth-js', () => {
  return gulp
    .src([
      'src/js/auth/authController.js',
      'src/js/auth/loginModel.js',
      'src/js/auth/loginController.js',
      'src/js/auth/loginView.js',
    ])
    .pipe(uglify(uglifyOptions))
    .pipe(gulp.dest('dist/js/auth'));
});

gulp.task('uglify-product-js', () => {
  return gulp
    .src([
      'src/js/products/productInventoryController.js',
      'src/js/products/productInventoryView.js',
      'src/js/products/productAddController.js',
      'src/js/products/productAddView.js',
      'src/js/products/productEditController.js',
      'src/js/products/productEditView.js',
    ])
    .pipe(uglify(uglifyOptions))
    .pipe(gulp.dest('dist/js/products'));
});

gulp.task('uglify-shared-js', () => {
  return gulp
    .src(['src/js/shared/model.js', 'src/js/shared/common.js'])
    .pipe(uglify(uglifyOptions))
    .pipe(gulp.dest('dist/js/shared'));
});

gulp.task('replace-html-links', () => {
  return gulp
    .src(
      [
        'src/index.html',
        'src/admin/index.html',
        'src/admin/bestillinger.html',
        'src/admin/hentede-bestillinger.html',
        'src/admin/produkter/index.html',
        'src/admin/produkter/opprett.html',
        'src/admin/produkter/rediger.html',
      ],
      { base: 'src' },
    )
    .pipe(
      htmlReplace({
        css: 'css/styles.min.css',
        js: 'js/scripts.min.js',
        'admin-css': '../css/admin-styles.min.css',
        'admin-produkt-css': '../../css/admin-styles.min.css',
      }),
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-files', () => {
  return gulp
    .src([
      'src/data/**/*',
      'src/docs/**/*',
      'src/img/**/*',
      'src/favicon.ico',
      'src/manifest.json',
      'src/service-worker.js',
      'src/js/vendors/dayjs.min.js',
      'src/js/vendors/nb.js',
      'src/js/vendors/purify.min.js',
    ])
    .pipe(copy('dist', { prefix: 1 }))
    .on('end', () => console.log('All files copied successfully.'));
});

gulp.task(
  'default',
  gulp.parallel(
    'combine-main-css',
    'combine-admin-css',
    'combine-main-js',
    'uglify-admin-js',
    'uglify-auth-js',
    'uglify-product-js',
    'uglify-shared-js',
    'replace-html-links',
    'copy-files',
  ),
);
